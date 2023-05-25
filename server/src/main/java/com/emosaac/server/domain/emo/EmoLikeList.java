package com.emosaac.server.domain.emo;

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
public class EmoLikeList {
    @OneToMany(mappedBy = "emopick", cascade = CascadeType.ALL, orphanRemoval = true) //orphanRemoval 없으면 삭제가 안됨.
    private final List<LikeEmo> likeList = new ArrayList<>();
    
    public int size(){
        return likeList.size();
    }

    public boolean toggleLike(LikeEmo likeEmo){
        if(contains(likeEmo.getUser().getUserId())){
            removeLike(likeEmo);
            return false;
        }
        likeList.add(likeEmo);
        return true;
    }

    private boolean contains(Long userId){
        return likeList.parallelStream().anyMatch(l -> l.ownedBy(userId));
    }

    private void removeLike(LikeEmo likeEmo){
        Long userId = likeEmo.getUser().getUserId();
        LikeEmo removeTarget = likeList.parallelStream()
                .filter(l -> l.ownedBy(userId))
                .findAny().orElseThrow(() -> new ResourceNotFoundException("이미 좋아요를 해제했습니다."));
        likeList.remove(removeTarget);
    }
}
