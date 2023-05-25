package com.emosaac.server.service.search;

import com.emosaac.server.domain.user.User;
import com.emosaac.server.dto.book.BookListResponse;
import com.emosaac.server.repository.book.BookQueryRepository;
import com.emosaac.server.repository.search.SearchQueryRepository;
import com.emosaac.server.service.CommonService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SearchService {
    private final SearchQueryRepository searchQueryRepository;
    private final BookQueryRepository bookQueryRepository;
    private final CommonService commonService;

    public List<BookListResponse> findBookListByTagName(String tagName, String type, int size, Long prevId, Double prevScore) {
        return searchQueryRepository.findBookListByTagName(tagName, type,  PageRequest.ofSize(size), prevId, prevScore);

    }

    public List<BookListResponse> findBookListByTitle(String content, String type, int size, Long prevId, Double prevScore) {
        return searchQueryRepository.findBookListByTitle(content.replace(" ", ""), type, PageRequest.ofSize(size), prevId, prevScore);
    }

    public List<BookListResponse> findBookByHit(Long userId) {
        User user = commonService.getUser(userId);

        return bookQueryRepository.findBookByHit(userId);
    }
}
