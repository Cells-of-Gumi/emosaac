package com.emosaac.server.domain.recommand;

import com.emosaac.server.domain.BaseEntity;
import com.emosaac.server.domain.book.Book;
import com.emosaac.server.domain.user.User;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name="UserPredictedGradeModel")
public class UserPredictedGradeModel extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="PRED_GRADE_NO")
    private Long id;

    // search_log - user
    @JsonManagedReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name ="USER_NO")
    private User user;

    // search_log - book
    @JsonManagedReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name ="BOOK_NO")
    private Book book;

    @Column(name = "PREDICT_SCORE")
    private double predictScore; // 작품별 사용자의 예상 평점 저장
}
