package com.emosaac.server.service.book;

import com.emosaac.server.common.SlicedResponse;
import com.emosaac.server.domain.book.*;
import com.emosaac.server.domain.user.User;
import com.emosaac.server.dto.book.*;
import com.emosaac.server.repository.book.BookQueryRepository;
import com.emosaac.server.repository.bookmark.BookmarkRepository;
import com.emosaac.server.repository.hit.HitRepository;
import com.emosaac.server.repository.readbook.ReadRepository;
import com.emosaac.server.repository.score.ScoreQueryRepository;
import com.emosaac.server.service.CommonService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BookService {

    private final BookQueryRepository bookQueryRepository;
    private final BookmarkRepository bookmarkRepository;
    private final ReadRepository readRepository;
    private final ScoreQueryRepository scoreQueryRepository;
    private final HitRepository hitRepository;
    private final CommonService commonService;

    // 요일별 작품 리스트
    public SlicedResponse<BookListResponse> findDayList(String day, int typeCd, Long genreCode, int size, Long prevId, Double prevScore) {

        Slice<BookListResponse> page = bookQueryRepository.findBookListByDay(day, typeCd, genreCode, PageRequest.ofSize(size), prevId, prevScore);
        return new SlicedResponse<>(page.getContent(), page.getNumber()+1, page.getSize(), page.isFirst(), page.isLast(), page.hasNext());
    }

    // 장르벌 작품 리스트
    public SlicedResponse<BookListResponse> findGenreList(Long genreCode, int typeCd, int size, Long prevId, Double prevScore) {

        Slice<BookListResponse> page = bookQueryRepository.findBookListByGenre(genreCode, typeCd, PageRequest.ofSize(size), prevId, prevScore);
        return new SlicedResponse<>(page.getContent(), page.getNumber()+1, page.getSize(), page.isFirst(), page.isLast(), page.hasNext());
    }

    // 작품 상세 조회
    @Transactional
    public BookDetailResponse findDetailByBook(Long bookId, Long userId) {
        Book book = commonService.getBook(bookId);
        if (userId == null)
            return new BookDetailResponse(book, false, false, 0.0);

        User user = commonService.getUser(userId);

        book.addHit();
        book.setAvgScore();

        if(!hitRepository.existsByBookIdAndUserId(bookId, userId).isPresent()){
            Hit hit = Hit.builder().book(book).user(user).build();
            hitRepository.save(hit);
        }else{
            Hit hit = hitRepository.findByBookIdAndUserId(bookId, userId);
            hit.update();
        }

        Boolean bookmarkStatus = false;
        if(bookmarkRepository.existsByBookIdAndUserId(bookId, userId).isPresent()){
            bookmarkStatus = true;
        }

        Boolean readStatus = false;
        if(readRepository.existsByBookIdAndUserId(bookId, userId).isPresent()){
            readStatus = true;
        }

        Score myScore = scoreQueryRepository.findScoreByBookIdAndUserId(bookId, userId);
        double score = 0.0;
        if(myScore != null) score = myScore.getScore();

        return new BookDetailResponse(book, bookmarkStatus, readStatus, score);
    }

    // 나의 북마크 리스트 조회
    public SlicedResponse<MyListResponse> findBookmarkList(int typeCd, int size, Long prevId, String inputTime, Long userId) {
        User user = commonService.getUser(userId);

        LocalDateTime prevTime = setPrevTime(inputTime);

        Slice<MyListResponse> page = bookQueryRepository.findBookMarkList(typeCd, PageRequest.ofSize(size), prevId, prevTime, userId);
        return new SlicedResponse<>(page.getContent(), page.getNumber()+1, page.getContent().size(), page.isFirst(), page.isLast(), page.hasNext());
    }

    // 나의 읽은 책 리스트 조회
    public SlicedResponse<MyListResponse> findReadBookList(int typeCd, int size, Long prevId, String inputTime, Long userId) {
        User user = commonService.getUser(userId);

        if(inputTime.equals("undefined")) inputTime = "0";

        LocalDateTime prevTime = setPrevTime(inputTime);

        Slice<MyListResponse> page = bookQueryRepository.findReadBookList(typeCd, PageRequest.ofSize(size), prevId, prevTime, userId);
        return new SlicedResponse<>(page.getContent(), page.getNumber()+1, page.getContent().size(), page.isFirst(), page.isLast(), page.hasNext());
    }

    // 나의 평점 리스트 조회
    public SlicedResponse<MyListResponse> findMyScoreList(int typeCd, int size, Long prevId, String inputTime, Long userId) {
        User user = commonService.getUser(userId);

//        if(inputTime.equals("undefined")) inputTime = "0";

        LocalDateTime prevTime = setPrevTime(inputTime);

        Slice<MyListResponse> page = bookQueryRepository.findMyScoreList(typeCd, PageRequest.ofSize(size), prevId, prevTime, userId);
        return new SlicedResponse<>(page.getContent(), page.getNumber()+1, page.getContent().size(), page.isFirst(), page.isLast(), page.hasNext());
    }

    private LocalDateTime setPrevTime(String inputTime) {
        return !inputTime.equals("0") ? LocalDateTime.parse(inputTime) : LocalDateTime.now();
    }

    // 북마크 설정
    @Transactional
    public Boolean toggleBookmarkByBook(Long bookId, Long userId) {
        Book book = commonService.getBook(bookId);
        User user = commonService.getUser(userId);

        return book.toggleBookmark(BookMark.builder().book(book).user(user).build());
    }

    // 읽음 여부 설정
    @Transactional
    public Object toggleReadByBook(Long bookId, Long userId) {
        Book book = commonService.getBook(bookId);
        User user = commonService.getUser(userId);

        return book.toggleReadBook(ReadBook.builder().book(book).user(user).build());
    }

    /* 평점 */

    public Double findScoreByUserAndBook(Long bookId, Long userId) {
        Book book = commonService.getBook(bookId);
        User user = commonService.getUser(userId);

        Score curScore = scoreQueryRepository.findScoreByBookIdAndUserId(bookId, userId);
        return curScore == null ? 0.0 : curScore.getScore();
    }

    @Transactional
    public Double updateScoreByUserAndBook(Long bookId, Long userId, Double score) {
        Book book = commonService.getBook(bookId);
        User user = commonService.getUser(userId);

        Score curScore = scoreQueryRepository.findScoreByBookIdAndUserId(bookId, userId);

        if(curScore != null){
            curScore.update(score);
            book.setAvgScore();
            return curScore.getScore();
        }

        if(!readRepository.existsByBookIdAndUserId(bookId, userId).isPresent())
            toggleReadByBook(bookId, userId);

//        toggleReadByBook(bookId, userId); // 평점 등록 시, 자동 읽음 처리

        double result = book.setScore(Score.builder().book(book).user(user).score(score).build());
        book.setAvgScore();
        return result;
    }

    /* 같은 작가 다른 작품 찾기 */
    public SlicedResponse<BookListResponse> findListByAuthor(Long bookId) {
        Book book = commonService.getBook(bookId);

        String[] author = book.getAuthor().split("/");

        List<BookListResponse> res =  bookQueryRepository.findBookByAuthor(bookId, author);
        return new SlicedResponse<>(res, 1, res.size(), true, true, false);
    }

    public PlatformResponse findListByPlatform() {
        List<BookListResponse> kakao = bookQueryRepository.findBookByPlatform(1);
        List<BookListResponse> naver = bookQueryRepository.findBookByPlatform(2);
        List<BookListResponse> ridi = bookQueryRepository.findBookByPlatform(4);

        return new PlatformResponse(kakao, naver, ridi);
    }
}
