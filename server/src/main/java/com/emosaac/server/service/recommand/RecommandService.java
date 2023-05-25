package com.emosaac.server.service.recommand;

import com.emosaac.server.common.SlicedResponse;
import com.emosaac.server.domain.book.ReadBook;
import com.emosaac.server.domain.book.Book;
import com.emosaac.server.domain.user.User;
import com.emosaac.server.dto.book.BookListResponse;
import com.emosaac.server.repository.book.BookQueryRepository;
import com.emosaac.server.dto.recommand.PredictedBookResponse;
import com.emosaac.server.repository.book.BookRepository;
import com.emosaac.server.repository.recommand.RecommandQueryRepository;
import com.emosaac.server.service.CommonService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Random;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RecommandService {

    private final CommonService commonService;
    private final RecommandQueryRepository recommandQueryRepository;
    private final BookQueryRepository bookQueryRepository;
    Long[] toonRec = {1L ,3L, 5L, 119L, 190L, 192L, 194L, 198L, 200L, 404L,
            421L, 596L, 950L, 1190L, 1195L, 1190L, 1159L, 2582L, 2306L, 2384L,
            3124L, 3854L, 2468L, 2789L, 4000L, 4002L, 4021L, 4453L, 4470L, 4463L};
    Long[] novelRec = {6533L, 6535L, 6538L, 6539L, 6544L, 6548L, 6549L, 6559L, 6739L, 7000L,
            6531L, 7145L, 7232L, 7242L, 7252L, 7258L, 7259L,7270L, 8368L, 9069L,
            8888L,8999L,9000L,9110L,9111L,9125L, 9889L, 10938L, 10939L, 10944L};

    public SlicedResponse<BookListResponse> findBestList(int typeCd) {
        Slice<BookListResponse> page = recommandQueryRepository.findBestList(typeCd, PageRequest.ofSize(30));
        return new SlicedResponse<>(page.getContent(), page.getNumber() + 1, page.getContent().size(), page.isFirst(), page.isLast(), page.hasNext());
    }

    public SlicedResponse<BookListResponse> findNewBookList(int size, Long prevId, String regist, int typeCd) {
        Slice<BookListResponse> page = recommandQueryRepository.findNewBookList(regist, typeCd, prevId, PageRequest.ofSize(size));
        return new SlicedResponse<>(page.getContent(), page.getNumber() + 1, page.getContent().size(), page.isFirst(), page.isLast(), page.hasNext());
    }

    public SlicedResponse<BookListResponse> findMdList(int typeCd) {
        List<BookListResponse> res = new ArrayList<>();

        int a[] = new int[10];
        Random r = new Random();

        for(int i = 0 ; i < 10 ; i++){
            a[i] = r.nextInt(30);
            for(int j = 0 ; j < i ; j++){
                if(a[i] == a[j]){
                    i--;
                }
            }
        }
        Long[][] type = {toonRec, novelRec};

        for (int val : a) {
            Long n = type[typeCd][val];
            BookListResponse book = new BookListResponse(commonService.getBook(n));
            res.add(book);
        }

        return new SlicedResponse<>(res, 1,  res.size(), true, true, false);

    }

    public SlicedResponse<BookListResponse> findItemList(Long bookId, Long userId) {
        if (bookId == 0) { // 제일 최근 본 작품과 유사한 작품 추천
            Optional<ReadBook> readBook = bookQueryRepository.findBookRecent(userId);
            if (readBook.isPresent()) {
                bookId = readBook.get().getBook().getBookId();
            }else {
                bookId = bookQueryRepository.findBookRecentHit(userId).get().getBook().getBookId();
            }
        }

//        return findBookStrListNotRead10(recommandQueryRepository.findItemList(bookId), userId);
        List<BookListResponse> res = findBookStrListNotRead10(recommandQueryRepository.findItemList(bookId), userId);
        return new SlicedResponse<>(res, 1, res.size(), true, true, false);
    }

    public SlicedResponse<PredictedBookResponse> findPredictList(int typeCd, int size, Double prevScore, Long prevId, Long userId) {

        User user = commonService.getUser(userId);

        Slice<PredictedBookResponse> page = recommandQueryRepository.findPredictList(typeCd, PageRequest.ofSize(size), prevId, prevScore, user.getUserId());
        return new SlicedResponse<>(page.getContent(), page.getNumber() + 1, page.getContent().size(), page.isFirst(), page.isLast(), page.hasNext());
    }

    public SlicedResponse<BookListResponse> findUserList(int typeCd, Long userId) { //유저베이스 추천
        User user = commonService.getUser(userId);
        String str = recommandQueryRepository.findUserList(user.getUserId(), typeCd);
        List<BookListResponse> res = findBookStrList(str, typeCd);
//        return res;
        return new SlicedResponse<>(res, 1, res.size(), true, true, false);
    }

    public List<BookListResponse> findBookStrList(String str, int typeCd) {
        List<BookListResponse> res = new ArrayList<>();

        if (str == null || str.isEmpty()) {
            Long[] bookIds = (typeCd == 0) ? toonRec : novelRec;
            List<Book> books = Arrays.stream(bookIds).map(commonService::getBook).collect(Collectors.toList());
            res = books.stream().map(BookListResponse::new).collect(Collectors.toList());
        } else {
            for (String bookIdStr : str.split(" ")) {
                BookListResponse book = new BookListResponse(commonService.getBook(Long.parseLong(bookIdStr)));
                res.add(book);
            }
        }

        return res;

    }

    public List<BookListResponse> findBookStrListNotRead10(String str, Long userId) {
        List<BookListResponse> res = new ArrayList<>();

        for (String bookIdStr : str.split(" ")) {
            // 안 읽은 작품 찾기
            Optional<BookListResponse> book = bookQueryRepository.findBookRead(Long.parseLong(bookIdStr), userId);

            if (book.isEmpty()) {
                res.add(new BookListResponse(commonService.getBook(Long.parseLong(bookIdStr))));
            }
            if (res.size() == 10) break;
        }
        return res;

    }

    public SlicedResponse<BookListResponse> findAgeAndGenderList(int typeCd, Long userId) { //나이, 성별별 통계
        User user = commonService.getUser(userId);
        int age = user.getAge();
        int gender = user.getGender();
        String str = recommandQueryRepository.findAgeAndGenderList(age, gender, typeCd);
        List<BookListResponse> res = findBookStrList(str, typeCd);
//        return res;
        return new SlicedResponse<>(res, 1, res.size(), true, true, false);
    }
}
