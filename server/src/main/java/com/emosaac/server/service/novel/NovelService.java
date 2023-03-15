package com.emosaac.server.service.novel;

import com.emosaac.server.common.SlicedResponse;
import com.emosaac.server.common.exception.ResourceNotFoundException;
import com.emosaac.server.domain.book.Book;
import com.emosaac.server.dto.novel.NovelDayResponse;
import com.emosaac.server.dto.novel.NovelDetailResponse;
import com.emosaac.server.repository.novel.NovelQueryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class NovelService {

    private final NovelQueryRepository novelQueryRepository;

    // 요일별 소설 리스트
    public SlicedResponse<NovelDayResponse> findDayList(String day, int size, String criteria, Long prevId, Double prevScore) {

        Slice<NovelDayResponse> page = novelQueryRepository.findBookListByDay(day, PageRequest.ofSize(size), prevId, prevScore, criteria);
        return new SlicedResponse<>(page.getContent(), page.getNumber()+1, page.getSize(), page.isFirst(), page.isLast(), page.hasNext());
    }

    // 장르벌 소설 리스트
    public SlicedResponse<NovelDayResponse> findGenreList(Long genreCode, int size, String criteria, Long prevId) {

        Slice<NovelDayResponse> page = novelQueryRepository.findBookListByGenre(genreCode, PageRequest.ofSize(size), prevId, criteria);
        return new SlicedResponse<>(page.getContent(), page.getNumber()+1, page.getSize(), page.isFirst(), page.isLast(), page.hasNext());
    }

    // 소설 상세 조회
    public NovelDetailResponse findDetailByNovel(Long bookId) {
//               Post post = postRepository.findPost(postId).orElseThrow(() -> new ResourceNotFoundException("Post", "postId", postId));
        Book book = novelQueryRepository.findBookByNovel(bookId).orElseThrow(() -> new ResourceNotFoundException("Book", "bookId", bookId));
        return new NovelDetailResponse(book);
    }

    public Object setBookmarkByNovel(int size, String criteria, Long id) {
        return null;
    }

    public Object setReadByNovel(int size, String criteria, Long id) {
        return null;
    }

    public Object findScoreByUser(int size, String criteria, Long id, Long userId) {
        return null;
    }

    public Object setScoreByUser(int size, String criteria, Long id, Long userId) {
        return null;
    }

    public Object updateScoreByUser(int size, String criteria, Long id, Long userId) {
        return null;
    }

    public Object deleteScoreByUser(int size, String criteria, Long id, Long userId) {
        return null;
    }

    public Object findListByAuthor(int size, String criteria, Long id) {
        return null;
    }

    public Object findListByItem(int size, String criteria, Long id) {
        return null;
    }
}