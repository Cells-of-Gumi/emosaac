package com.emosaac.server.service.emopick;

import com.emosaac.server.common.SlicedResponse;
import com.emosaac.server.common.exception.ResourceForbiddenException;
import com.emosaac.server.common.exception.ResourceNotFoundException;
import com.emosaac.server.domain.book.Book;
import com.emosaac.server.domain.emo.*;
import com.emosaac.server.domain.user.User;
import com.emosaac.server.dto.emopick.*;
import com.emosaac.server.repository.emopick.*;
import com.emosaac.server.service.CommonService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.Map.Entry;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class EmopickService {

    private final EmopickRepository emopickRepository;
    private final EmopickQueryRepository emopickQueryRepository;
    private final EmoLikeRepository emoLikeRepository;
    private final EmopickDetailRepository emopickDetailRepository;
    private final CommonService commonService;

    // 이모픽 리스트 조회 + 썸네일 n 개도 함께
    public SlicedResponse<EmopickListResponse> findEmopickList(int size, Long prevId, Long userId){

        Slice<EmopickListResponse> page = emopickQueryRepository.findEmopickList(PageRequest.ofSize(size), prevId, userId);

        for (EmopickListResponse emoList : page.getContent()){

            List<ThumbnailListResponse> thumbnails = emopickQueryRepository.findThumbnail(Long.valueOf(emoList.getEmopickId()));

            String str = "";

            for (ThumbnailListResponse thumbnail : thumbnails){
                str += thumbnail.getThumbnail() + " ";
            }

            Long likeCnt = emopickQueryRepository.findLikeCnt(emoList.getEmopickId());
            Long bookCnt = emopickQueryRepository.findBookCnt(emoList.getEmopickId());

            emoList.setThumbnails(str);
            emoList.setLikeCnt(likeCnt);
            emoList.setbookCnt(bookCnt);
        }

        return new SlicedResponse<>(page.getContent(), page.getNumber()+1, page.getContent().size(), page.isFirst(), page.isLast(), page.hasNext());

    }

    public SlicedResponse<EmopickListResponse> findEmopickListByComment(Long userId, Long prevId, int size) {
        Slice<EmopickListResponse> page = emopickQueryRepository.findEmopickListByComment(PageRequest.ofSize(size), prevId, userId);

        for (EmopickListResponse emoList : page.getContent()){

            List<ThumbnailListResponse> thumbnails = emopickQueryRepository.findThumbnail(Long.valueOf(emoList.getEmopickId()));

            String str = "";

            for (ThumbnailListResponse thumbnail : thumbnails){
                str += thumbnail.getThumbnail() + " ";
            }

            emoList.setThumbnails(str);
        }

        return new SlicedResponse<>(page.getContent(), page.getNumber()+1, page.getContent().size(), page.isFirst(), page.isLast(), page.hasNext());
    }

    public SlicedResponse<EmopickListResponse> findEmopickListByLike(Long userId, Long prevId, int size) {
        Slice<EmopickListResponse> page = emopickQueryRepository.findEmopickListByLike(PageRequest.ofSize(size), prevId, userId);

        for (EmopickListResponse emoList : page.getContent()){

            List<ThumbnailListResponse> thumbnails = emopickQueryRepository.findThumbnail(Long.valueOf(emoList.getEmopickId()));

            String str = "";

            for (ThumbnailListResponse thumbnail : thumbnails){
                str += thumbnail.getThumbnail() + " ";
            }

            emoList.setThumbnails(str);
        }

        return new SlicedResponse<>(page.getContent(), page.getNumber()+1, page.getContent().size(), page.isFirst(), page.isLast(), page.hasNext());
    }

    // 이모픽 상세 조회
    public EmopickDetailResponse<BookReviewResponse> findEmopickDetail(Long emopickId, Long userId) {
        Emopick emopick = emopickRepository.findById(emopickId).orElseThrow(() -> new ResourceNotFoundException("emopick", "emopickId", emopickId));

        List<BookReviewResponse> webtoon = new ArrayList<>();
        List<BookReviewResponse> novel = new ArrayList<>();

        // type이 0인거 가져오기
        webtoon = emopickQueryRepository.findEmopickDetailByEmopickId(emopickId, 0);

        // type이 1인거 가져오기
        novel = emopickQueryRepository.findEmopickDetailByEmopickId(emopickId, 1);

        Boolean emoLikeStatus = false;
        if(emoLikeRepository.existsByEmopickIdAndUserId(emopickId, userId).isPresent())
            emoLikeStatus = true;

        Long likeCnt = emopickQueryRepository.findLikeCnt(emopickId);

        boolean isUpdate = false;
        if (emopick.getUser().getUserId() == userId) isUpdate = true;
        
        EmopickDetailResponse result = new EmopickDetailResponse(emopick.getUser(), emopick.getTitle(), emopick.getContent(), webtoon, novel, emoLikeStatus, likeCnt, isUpdate);

        return result;
    }

    // 이모픽 등록
    @Transactional
    public Long createEmopickByUser(EmopickSaveRequest request, Long userId) {

        User user = commonService.getUser(userId);
        Emopick emopick = emopickRepository.save(request.of(user));

        if (request.getWebtoonList() != null || !request.getWebtoonList().isEmpty())
            setEmopickDetail(emopick, request.getWebtoonList(), 0);

        if (request.getNovelList() != null || !request.getNovelList().isEmpty())
            setEmopickDetail(emopick, request.getNovelList(), 1);

        return emopick.getEmopickId();
    }

    private void setEmopickDetail(Emopick emopick, Map<Long, String> bookList, int type){
        for(Entry<Long, String> review : bookList.entrySet()){
            Book book = commonService.getBook(review.getKey());
            EmopickDetail emopickDetail = EmopickDetail.builder().emopick(emopick).book(book).review(review.getValue()).type(type).build();
            emopickDetailRepository.save(emopickDetail);
        }
    }

    // 이모픽 수정
    @Transactional
    public Long updateEmopickByUser(Long emopickId, EmopickSaveRequest request, Long userId) {
        Emopick emopick = emopickRepository.findById(emopickId).orElseThrow(() -> new ResourceNotFoundException("emopick", "emopickId", emopickId));

        validEmopickUser(userId, emopick.getUser().getUserId());

        emopick.update(request);

        if (request.getWebtoonList() != null || !request.getWebtoonList().isEmpty())
            updateEmopickDetail(emopick, request.getWebtoonList(), 0);

        if (request.getNovelList() != null || !request.getNovelList().isEmpty())
            updateEmopickDetail(emopick, request.getNovelList(), 1);

        return emopick.getEmopickId();
    }

    private void updateEmopickDetail(Emopick emopick, Map<Long, String> bookList, int type) {
        for(Entry<Long, String> review : bookList.entrySet()){
            Book book = commonService.getBook(review.getKey());
            EmopickDetail emopickDetail = emopickDetailRepository.findByEmopickIdAndBookId(emopick.getEmopickId(), book.getBookId());
            emopickDetail.update(book, review.getValue(), type);
        }
    }

    // 이모픽 삭제
    @Transactional
    public Long deleteEmopickByUser(Long emopickId, Long userId) {
        Emopick emopick = emopickRepository.findById(emopickId).orElseThrow(() -> new ResourceNotFoundException("emopick", "emopickId", emopickId));

        validEmopickUser(userId, emopick.getUser().getUserId());

        emopickDetailRepository.deleteByEmopickId(emopick.getEmopickId());

        emopick.clearUser();
        emopickRepository.deleteById(emopickId);
        return emopickId;
    }

    // 이모픽 좋아요
    @Transactional
    public Object toggleLikesByEmopick(Long emopickId, Long userId) {
        Emopick emopick = emopickRepository.findById(emopickId).orElseThrow(() -> new ResourceNotFoundException("emopick", "emopickId", emopickId));
        User user = commonService.getUser(userId);

        LikeEmo likeEmo = LikeEmo.builder().emopick(emopick).user(user).build();
        return emopick.toggleLikes(likeEmo);
    }

    ///////////////////////

    public void validEmopickUser(Long currentUser, Long emopickUser) {

        if (currentUser == emopickUser || currentUser.equals(emopickUser)) {
            return;
        }
        else {
            throw new ResourceForbiddenException("본인이 작성한 글이 아닙니다");
        }
    }



}
