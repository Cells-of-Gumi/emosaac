package com.emosaac.server.domain.book;

import com.emosaac.server.domain.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@DynamicUpdate
public class DayToon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "DAY_TOON_CD")
    private Long dayId;

    @Column(name = "DAY_NAME")
    private String name;

    @Column(name = "BOOK_NO_LIST", columnDefinition = "TEXT")
    private String bookList;
}
