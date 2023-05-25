package com.emosaac.server.dto.emopick;

import com.emosaac.server.domain.user.User;
import com.emosaac.server.dto.comment.WriterInfo;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class EmopickDetailResponse<T> {
    /*썸네일, 제목, 장르, 초기등록일, 작가명, 평균 평점, 플랫폼별 평점
+ review */
    private WriterInfo writerInfo;
    private String title;
    private String content;
    private Object webtoon;
    private Object novel;
    private boolean emoLike;
    private Long likeCnt;
    private boolean isUpdate;

    public EmopickDetailResponse(User user, String title, String content, Object webtoon, Object novel, boolean emoLikeStatus, Long likeCnt, boolean isUpdate){
        this.writerInfo = WriterInfo.from(user);
        this.title = title;
        this.content = content;
        this.webtoon = webtoon;
        this.novel = novel;

        this.emoLike = emoLikeStatus;
        this.likeCnt = likeCnt;

        this.isUpdate = isUpdate;
    }
}