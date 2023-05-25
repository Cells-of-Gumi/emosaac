package com.emosaac.server.domain.book;

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
public class ScoreList {
    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL, orphanRemoval = true) //orphanRemoval 없으면 삭제가 안됨.
    private final List<Score> scoreList = new ArrayList<>();

    public int size(){
        return scoreList.size();
    }

    public double setScore(Score score){
//        if(contains(score.getUser().getUserId())){
//            int index = scoreList.indexOf(score);
//            System.out.println("index " + index + " " + size());
//            scoreList.set(index, score);
//        }else{
            scoreList.add(score);
//        }
        return score.getScore();
    }

    private boolean contains(Long userId){
        return scoreList.parallelStream().anyMatch(l -> l.ownedBy(userId));
    }

//    private int getIndex(Long userId){
//        return scoreList.parallelStream().;
//    }

    public double getAvgScore(){
        double sum = 0;
        for(Score score : scoreList){
            sum += score.getScore();
        }

        if(size() == 0) return 0;

        return sum/size();
    }

}
