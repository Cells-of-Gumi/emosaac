package com.emosaac.server.domain.comment;

import com.emosaac.server.common.exception.ResourceNotFoundException;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.CascadeType;
import javax.persistence.Embeddable;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@Embeddable
public class CommentLikeList {
    @OneToMany(mappedBy = "comment", cascade = CascadeType.ALL, orphanRemoval = true) //orphanRemoval 없으면 삭제가 안됨.
    private final List<CommentLike> commentLikeList = new ArrayList<>();

    public int size(){
        return commentLikeList.size();
    }

    public boolean toggleCommentLike(CommentLike commentLike){
        if(contains(commentLike.getUser().getUserId())){
            removeBookCommentLike(commentLike);
            return false;
        }
        commentLikeList.add(commentLike);
        return true;
    }

    public boolean contains(Long userId){
        return commentLikeList.parallelStream()
                .anyMatch(l -> l.ownedBy(userId));
    }

    private void removeBookCommentLike(CommentLike commentLike) {
        Long userId = commentLike.getUser().getUserId();
        CommentLike removalTarget = commentLikeList.parallelStream()
                .filter(l -> l.ownedBy(userId))
                .findAny()
                .orElseThrow(()-> new ResourceNotFoundException("이미 좋아요를 해제했습니다"));
        commentLikeList.remove(removalTarget);
    }
}
