package com.emosaac.server.domain.emo;

import com.emosaac.server.domain.BaseEntity;
import com.emosaac.server.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@DynamicInsert //@DynamicInsert사용
@DynamicUpdate
public class LikeEmo extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "LIKE_NO")
    private Long likeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "EMOPICK_NO")
    private Emopick emopick;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_NO")
    private User user;

    @Builder
    public LikeEmo(Emopick emopick, User user){
        this.emopick = emopick;
        this.user = user;
    }

    public boolean ownedBy(Long userId) {
        return this.user.getUserId().equals(userId);
    }

}
