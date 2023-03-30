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

        //선택한 책들을 조회 테이블에 추가(관심의 척도,,,)
        postHits(user, request.getNovelId());
        postHits(user, request.getWebtoonId());
        ////////////

        String strWebtoon = BookListToString(request.getWebtoonId());
        String strNovel = BookListToString(request.getNovelId());

        user.setFavoriteWebtoonGenre(strWebtoon); //선호 장르에 반영
        user.setFavoriteNovelGenre(strNovel); //선호 장르에 반영

        List<GenreResponse> webtoon = userService.stringToGenreList(strWebtoon).stream().map((genre) -> new GenreResponse(genre)).collect(Collectors.toList());
        List<GenreResponse> novel = userService.stringToGenreList(strNovel).stream().map((genre) -> new GenreResponse(genre)).collect(Collectors.toList());

        return new GenreResponseList(webtoon, novel);


    }

    @Transactional
    void postHits(User user, Long[] request) {

        for(Long bookId: request){
            Book book = commonService.getBook(bookId);

            if(!hitRepository.existsByBookIdAndUserId(bookId, user.getUserId()).isPresent()){
                Hit hit = Hit.builder().book(book).user(user).build();
                hitRepository.save(hit);
            }
        }
    }

    public String BookListToString(Long[] request) {
        Map<Long, Double> map = new HashMap<>();

        for (Long tmp : request) {
            Book book = commonService.getBook(tmp);
            Long genreId = book.getGenre().getGerneId();
            map.put(genreId, map.getOrDefault(genreId, 1.0) + 1);
        }

        LinkedHashMap<Long, Double> sortedMap = MapToSortedMap(map);

        String str = "";
        int idx = 0;
        for (Map.Entry<Long, Double> entry : sortedMap.entrySet()) {
            if (idx == 3) {
                break;
            }
            str += entry.getKey() + "^";
            idx++;
        }

        return str;
    }

    //장르 코드 주면 안읽은 것중에 조회 *안쓸것 같아요
    public SlicedResponse<BookListResponse> getBookByGenre(Long userId, BookRequest request) {
        User user = commonService.getUser(userId);
        Slice<BookListResponse> page = genreQueryRepository.findBookListByGenre(user, request, PageRequest.ofSize(request.getSize()));
        return new SlicedResponse<>(page.getContent(), page.getNumber() + 1, page.getSize(), page.isFirst(), page.isLast(), page.hasNext());

    }

    public List<TotalResponse> getTotalAmount(Long userId, int typeCode) {
        User user = commonService.getUser(userId);

//        Long count = genreQueryRepository.findTotalCount(userId, typeCode);
        List<TotalResponse> list = new ArrayList<>();
        Long[] genreList;

        genreList = (typeCode == 0) ? webtoonGenreList : novelGenreList;

        for (int i = 0; i < genreList.length; i++) {
            Genre genre = commonService.getGenre(genreList[i]);
            Long count = genreQueryRepository.findGenreCountByHit(userId, typeCode, genreList[i]);
            list.add(new TotalResponse(genreList[i], genre.getName(), (
                    count == null ? 0 : count
                    )
            ));
        }
        return list;

//        Long count = genreQueryRepository.findTotalCount(userId, typeCode);
//        List<TotalResponse> list = new ArrayList<>();
//        Long[] genreList;
//
//        genreList = (typeCode == 0) ? webtoonGenreList : novelGenreList;
//
//        if (count > 0) {
//            for (int i = 0; i < genreList.length; i++) {
//                Genre genre = commonService.getGenre(genreList[i]);
//                list.add(new TotalResponse(genreList[i], genre.getName(), ((double)
//                        genreQueryRepository.findReadSpecGenreCount(userId, typeCode, genreList[i]) / count * 100)
//                ));
//            }
//        } else {
//            for (int i = 0; i < genreList.length; i++) {
//                Genre genre = commonService.getGenre(genreList[i]);
//                list.add(new TotalResponse(genreList[i], genre.getName(), 0.0, "책 읽음 정보를 넣어주세요"));
//            }
//
//        }
//        return list;

    }

    private LinkedHashMap<Long, Double> MapToSortedMap(Map<Long, Double> map) {
        ArrayList<Double> tmpList = new ArrayList<>();
        LinkedHashMap<Long, Double> sortedMap = new LinkedHashMap<>();

        for (Map.Entry<Long, Double> entry : map.entrySet()) {
            tmpList.add(entry.getValue());
        }
        Collections.sort(tmpList, Collections.reverseOrder());

        for (Double num : tmpList) {
            for (Map.Entry<Long, Double> entry : map.entrySet()) {
                if (entry.getValue().equals(num)) {
                    sortedMap.put(entry.getKey(), num);
                }
            }
        }

        return sortedMap;
    }

    public List<Long> calcMinOrMax(List<TotalResponse> list) { //2
        ArrayList<Long> likeList = new ArrayList<>();
        Map<Long, Double> map = new HashMap<>();

        for (TotalResponse totalResponse : list) {
            map.put(totalResponse.getGenreId(), totalResponse.getAmount());
        }

        LinkedHashMap<Long, Double> sortedMap = MapToSortedMap(map);

        for (Map.Entry<Long, Double> entry : sortedMap.entrySet()) {
            likeList.add(entry.getKey());
        }

        return likeList;
    }




    public List<TotalResponse> getTotalGenreCount(Long userId, int typeCode) { //카운트 세서 리스트에 담기

        List<TotalResponse> list = new ArrayList<>();
        Long[] GenreList;

        GenreList = (typeCode == 0) ? webtoonGenreList : novelGenreList;

        for (int i = 0; i < GenreList.length; i++) {
            Genre genre = commonService.getGenre(GenreList[i]);
            list.add(new TotalResponse(GenreList[i], genre.getName(), (double) (
                    genreQueryRepository.findReadSpecGenreCount(userId, typeCode, GenreList[i]))
            ));
        }

        return list;
    }

    public Long[] getLikeList(int isLike, List<Long> tmpList) { //api에서 사용

        Long[] likeList = new Long[7];

        if (isLike == 1) { //선호
            int idx = 0;
            for (int i = 0; i < 3; i++) {
                likeList[idx++] = tmpList.get(i);
            }
        } else {
            int idx = 0;
            for (int i = tmpList.size() - 1; i > 3; i--) {
                likeList[idx++] = tmpList.get(i);
            }
        }
        return likeList;
    }


    //통계기반 선호/비선호 장르 조회
    @Transactional
    public List<GenreResponse> getTotalGenre(Long userId, int typeCode, int isLike) { //api에서 사용

        List<TotalResponse> list = getTotalGenreCount(userId, typeCode); //2

        List<Long> tmpList = calcMinOrMax(list); //2
        Long[] likeList = getLikeList(isLike, tmpList);

        return genreQueryRepository.findBookGenreisLike(typeCode, likeList).stream().map(
                (genre) -> new GenreResponse(genre)).collect(Collectors.toList());

    }

    //선호/비선호 : 랜덤으로 한개만 반환(선호/비선호 장르 중에 탑 2)
    public BookListResponse getTotalGenreBookOne(Long userId, int typeCd, int isLike) {
        List<TotalResponse> list = getTotalGenreCount(userId, typeCd);
        List<Long> tmpList = calcMinOrMax(list); //2

        Long[] likeList = getLikeList(isLike, tmpList);

        Long[] top2List = new Long[3];
        top2List[0] = likeList[0];
        top2List[1] = likeList[1];

        List<BookListResponse> responses = genreQueryRepository.findBookLikeRandom(userId, typeCd, isLike, top2List);
        int rndNum = (int) (Math.random() * 29);
        return responses.get(rndNum);
    }

    //비선호 : 카운트를 기준으로 *안쓸것 같아요
    public SlicedResponse<BookListResponse> getTotalUnlikeGenreBook(Long userId, BookRequest request) {

        List<TotalResponse> list = getTotalGenreCount(userId, request.getTypeCd());
        List<Long> tmpList = calcMinOrMax(list); //2

        Long[] likeList = getLikeList(0, tmpList);

        Slice<BookListResponse> page = genreQueryRepository.findBookLikeGenre(userId, request, PageRequest.ofSize(request.getSize()), likeList[request.getOrder() - 1]);
        return new SlicedResponse<>(page.getContent(), page.getNumber() + 1, page.getSize(), page.isFirst(), page.isLast(), page.hasNext());

    }


    //선호는 컬럼을 기준으로 하자
    public SlicedResponse<BookListResponse> getTotalLikeGenreBook(Long userId, BookRequest request) {
        User user = commonService.getUser(userId);
        String str = (request.getTypeCd() == 0) ? user.getFavoriteWebtoonGenre() : user.getFavoriteNovelGenre(); //선호 장르에 반영
        List<Long> likeList = new ArrayList<>();
        userService.stringToGenreList(str).stream().forEach((genre) -> likeList.add(genre.getGerneId()));

        Slice<BookListResponse> page = genreQueryRepository.findBookLikeGenre(userId, request, PageRequest.ofSize(request.getSize()), likeList.get(request.getOrder() - 1));
        return new SlicedResponse<>(page.getContent(), page.getNumber() + 1, page.getSize(), page.isFirst(), page.isLast(), page.hasNext());
    }


    @Transactional
    public void setFavoriteGenre(List<Long> likeList, int typeCode, Long userId) {  //2 ,4
        User user = commonService.getUser(userId);

        String str = listToString(likeList); //3
        if (typeCode == 0) {
            user.updateFavoriteWebtoonGenre(str);
        } else if (typeCode == 1) {
            user.updateFavoriteNovelGenre(str);
        }
    }

    public String listToString(List<Long> likeList) { //3
        String str = "";
        if (likeList != null && !likeList.isEmpty()) {
            for (int i = 0; i < 3; i++) {
                Genre genre = commonService.getGenre(likeList.get(i));
                str += genre.getGerneId() + "^";
            }
        }
        return str;
    }
}
