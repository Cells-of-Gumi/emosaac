package com.emosaac.server.service.genre;

import com.emosaac.server.common.SlicedResponse;
import com.emosaac.server.common.exception.ResourceNotFoundException;
import com.emosaac.server.domain.book.Book;
import com.emosaac.server.domain.book.Genre;
import com.emosaac.server.domain.book.Hit;
import com.emosaac.server.domain.user.User;
import com.emosaac.server.dto.book.BookListResponse;
import com.emosaac.server.dto.book.BookRequest;
import com.emosaac.server.dto.genre.GenreResponse;
import com.emosaac.server.dto.genre.GenreResponseList;
import com.emosaac.server.dto.genre.TotalResponse;
import com.emosaac.server.dto.genre.UserResearchRequest;
import com.emosaac.server.dto.user.UserGenreRequest;
import com.emosaac.server.repository.book.BookRepository;
import com.emosaac.server.repository.genre.GenreQueryRepository;
import com.emosaac.server.repository.genre.GenreRepository;
import com.emosaac.server.repository.hit.HitRepository;
import com.emosaac.server.repository.user.UserRepository;
import com.emosaac.server.service.CommonService;
import com.emosaac.server.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GenreService {
    private final GenreQueryRepository genreQueryRepository;
    private final UserService userService;
    private final CommonService commonService;
    private final Long[] webtoonGenreList = {10L, 11L, 12L, 13L, 14L, 15L, 16L};
    private final Long[] novelGenreList = {10L, 11L, 13L, 14L, 15L, 27L, 28L};
    private final HitRepository hitRepository;
    private final UserRepository userRepository;

    public List<GenreResponse> getBookGenre(int typeCode) {
        return genreQueryRepository.findBookGenre(typeCode).stream().map(
                (genre) -> new GenreResponse(genre)).collect(Collectors.toList());
    }


    //설문조사 리스트
    public List<BookListResponse> getResearch(int typeCode) {
        return genreQueryRepository.findResearch(typeCode);
    }

    @Transactional
    public GenreResponseList postResearch(Long userId, UserResearchRequest request) { //나의 선호 장르에 반영해야함

        User user = commonService.getUser(userId);

        //선택한 책들을 조회 테이블에 추가
        postHits(user, request.getNovelId());
        postHits(user, request.getWebtoonId());

        //같은 나이대나 성별에도 조회수도 추가
        Integer age = user.getAge();
        Integer gender = user.getGender();

        for (User userTmp : userRepository.findAgeAndGenUser(gender, age)) {
            postHits(userTmp, request.getNovelId());
            postHits(userTmp, request.getWebtoonId());
        }


        String strWebtoon = bookListToFavoriteString(request.getWebtoonId());
        String strNovel = bookListToFavoriteString(request.getNovelId());

        //선호 장르에 반영
        user.updateFavoriteWebtoonGenre(strWebtoon);
        user.updateFavoriteNovelGenre(strNovel);

        // Convert favorite genres to GenreResponse lists
        List<GenreResponse> webtoon = stringToGenreResponseList(strWebtoon);
        List<GenreResponse> novel = stringToGenreResponseList(strNovel);

        return new GenreResponseList(webtoon, novel);


    }

    private List<GenreResponse> stringToGenreResponseList(String str) {
        return userService.stringToGenreList(str)
                .stream()
                .map(GenreResponse::new)
                .collect(Collectors.toList());
    }

    @Transactional
    void postHits(User user, Long[] request) {

        for (Long bookId : request) {
            Book book = commonService.getBook(bookId);

            if (!hitRepository.existsByBookIdAndUserId(bookId, user.getUserId()).isPresent()) {
                Hit hit = Hit.builder().book(book).user(user).build();
                hitRepository.save(hit);
            } else {
                Hit hit = hitRepository.findByBookIdAndUserId(bookId, user.getUserId());
                hit.update();
            }
        }
    }

    //설문조사 반영하기(map으로 많이 들어온 장르 3개 추출)
    public String bookListToFavoriteString(Long[] request) {
        Map<Long, Long> map = new HashMap<>();

        for (Long tmp : request) {
            Book book = commonService.getBook(tmp);
            Long genreId = book.getGenre().getGerneId();
            map.put(genreId, map.getOrDefault(genreId, 1L) + 1);
        }

        LinkedHashMap<Long, Long> sortedMap = mapToSortedMap(map);

        StringBuilder sb = new StringBuilder();
        int idx = 0;
        for (Map.Entry<Long, Long> entry : sortedMap.entrySet()) {
            if (idx == 3) {
                break;
            }
            sb.append(entry.getKey()).append("^");
            idx++;
        }

        return sb.toString();
    }

    //장르 코드 주면 안읽은 것중에 조회 *안쓸것 같아요
    public SlicedResponse<BookListResponse> getBookByGenre(Long userId, BookRequest request) {
        User user = commonService.getUser(userId);
        Slice<BookListResponse> page = genreQueryRepository.findBookListByGenre(user, request, PageRequest.ofSize(request.getSize()));
        return new SlicedResponse<>(page.getContent(), page.getNumber() + 1, page.getContent().size(), page.isFirst(), page.isLast(), page.hasNext());

    }

    //Arrays.stream을 이용하여 GenreList를 스트림으로 변환하고, map과 collect를 이용하여 TotalResponse를 생성
    public List<TotalResponse> getTotalAmount(Long userId, int typeCode) {
        User user = commonService.getUser(userId);

        return Arrays.stream((typeCode == 0) ? webtoonGenreList : novelGenreList).map(genreId -> {
            Genre genre = commonService.getGenre(genreId);
            Long count = genreQueryRepository.findGenreCountByHit(userId, typeCode, genreId);
            return new TotalResponse(genreId, genre.getName(), count == null ? 0 : count);
        }).collect(Collectors.toList());
    }


    //Map의 entrySet을 가져와 stream으로 변환하고, sorted를 이용하여 정렬한 뒤, collect를 이용하여 맵으로 다시 변환
    private LinkedHashMap<Long, Long> mapToSortedMap(Map<Long, Long> map) {
        return map.entrySet().stream()
                .sorted(Collections.reverseOrder(Map.Entry.comparingByValue()))
                .collect(Collectors.toMap(
                        Map.Entry::getKey, Map.Entry::getValue, (e1, e2) -> e2,
                        LinkedHashMap::new));
    }

    //List<TotalResponse>를 맵으로 만들고 맵의 value값으로 내림차순 정렬
    public List<Long> calcMinOrMax(List<TotalResponse> list) {
        ArrayList<Long> likeList = new ArrayList<>();
        Map<Long, Long> map = new HashMap<>();

        for (TotalResponse totalResponse : list) {
            map.put(totalResponse.getGenreId(), totalResponse.getCount());
        }

        LinkedHashMap<Long, Long> sortedMap = mapToSortedMap(map);

        for (Map.Entry<Long, Long> entry : sortedMap.entrySet()) {
            likeList.add(entry.getKey());
        }

        return likeList;
    }

    //List.subList를 이용하여 리스트 자르기
    public Long[] getLikeList(int isLike, List<Long> tmpList) {
        List<Long> likeList = isLike == 1 ? tmpList.subList(0, 3) : tmpList.subList(tmpList.size() - 3, tmpList.size());
        return likeList.toArray(new Long[0]);
    }

    //통계기반 선호/비선호 장르 조회 *test용입니다*
    @Transactional
    public List<GenreResponse> getTotalGenre(Long userId, int typeCode, int isLike) {

        List<TotalResponse> list = getTotalAmount(userId, typeCode); //2

        List<Long> tmpList = calcMinOrMax(list); //2
        Long[] likeList = getLikeList(isLike, tmpList);

        return genreQueryRepository.findBookGenreisLike(typeCode, likeList).stream().map(
                (genre) -> new GenreResponse(genre)).collect(Collectors.toList());

    }

    //선호/비선호 : 랜덤으로 한개만 반환(선호/비선호 장르 중에 탑 2)
    public List<BookListResponse> getTotalGenreBookCount(Long userId, int typeCd, int isLike, int count) {
        List<TotalResponse> list = getTotalAmount(userId, typeCd);

        List<Long> tmpList = calcMinOrMax(list); //2

        Long[] likeList = getLikeList(isLike, tmpList);
        Long[] top2List = new Long[2];

        if (isLike == 1) {
            top2List[0] = likeList[0];
            top2List[1] = likeList[1];
        } else {
            top2List[0] = likeList[2];
            top2List[1] = likeList[1];
        }

        List<BookListResponse> bookListQueryResponses = genreQueryRepository.findBookLikeRandom(userId, typeCd, isLike, top2List);
        int randomIndex = (int) (Math.random() * bookListQueryResponses.size() / 2);

        List<BookListResponse> bookListResponses = new ArrayList<>();

        int idx = 0;
        for (int i = 0; i < count; i++) {
            bookListResponses.add(bookListQueryResponses.get(randomIndex + idx++));
        }

        return bookListResponses;
    }


    //비선호 : 카운트를 기준으로 *안쓸것 같아요
    public SlicedResponse<BookListResponse> getTotalUnlikeGenreBook(Long userId, BookRequest request) {

        List<TotalResponse> list = getTotalAmount(userId, request.getTypeCd());

        List<Long> tmpList = calcMinOrMax(list); //2

        Long[] likeList = getLikeList(0, tmpList);

        Slice<BookListResponse> page = genreQueryRepository.findBookLikeGenre(userId, request, PageRequest.ofSize(request.getSize()), likeList[request.getOrder() - 1]);
        return new SlicedResponse<>(page.getContent(), page.getNumber() + 1, page.getContent().size(), page.isFirst(), page.isLast(), page.hasNext());

    }


    //선호는 컬럼을 기준으로 하자
    public SlicedResponse<BookListResponse> getTotalLikeGenreBook(Long userId, BookRequest request) {
        User user = commonService.getUser(userId);
        String str = (request.getTypeCd() == 0) ? user.getFavoriteWebtoonGenre() : user.getFavoriteNovelGenre(); //선호 장르에 반영

        List<Long> likeList = userService.stringToGenreList(str)
                .stream()
                .map(Genre::getGerneId)
                .collect(Collectors.toList());

        Slice<BookListResponse> page = genreQueryRepository.findBookLikeGenre(userId, request, PageRequest.ofSize(request.getSize()), likeList.get(request.getOrder() - 1));
        return new SlicedResponse<>(page.getContent(), page.getNumber() + 1, page.getContent().size(), page.isFirst(), page.isLast(), page.hasNext());
    }

}
