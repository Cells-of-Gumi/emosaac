package com.emosaac.server.domain.emo;

import com.emosaac.server.domain.BaseEntity;
import com.emosaac.server.dto.emopick.EmopickSaveRequest;
import com.vladmihalcea.hibernate.type.json.JsonStringType;

import com.emosaac.server.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@DynamicUpdate
@TypeDef(name = "json", typeClass = JsonStringType.class)
public class Emopick extends BaseEntity implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "EMOPICK_NO")
    private Long EmopickId;

    private String title;

    @Column(columnDefinition="TEXT")
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_NO")
    private User user;

//    private String CONTENTS_LIST; //map으로 변환 해야함

//    @Type(type = "json")
//    @Column(name = "CONTENTS_LIST", columnDefinition = "json")
//    private Map<Long, String> emopickList = new LinkedHashMap<>();
//
//    @Column(name = "WEBTOON_SEQ")
//    private String webtoonSeq;
//
//    @Column(name = "NOVEL_SEQ")
//    private String novelSeq;

    @Embedded
    private final EmoLikeList likeList = new EmoLikeList();

    @Builder
    public Emopick(User user, String title, String content){
        this.user = user;
        this.title = title;
        this.content = content;
    }

    public void update(EmopickSaveRequest request){
        this.title = request.getTitle();
        this.content = request.getContent();
    }


//    public void addEmopick(Long bookId, String review){
//        emopickList.put(bookId, review);
//    }
//
//    public void setSeq(String webtoonSeq, String novelSeq){
//        this.webtoonSeq = webtoonSeq;
//        this.novelSeq = novelSeq;
//    }

    public void clearUser() {
        this.user = null;
    }

    public boolean toggleLikes(LikeEmo likeEmo) {
        return likeList.toggleLike(likeEmo);
    }

}
