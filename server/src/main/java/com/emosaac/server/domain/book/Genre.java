package com.emosaac.server.domain.book;

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
public class Genre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "GENRE_CD")
    private Long gerneId;
    /*
    10: 로맨스, 11: 로판, 12: 드라마, 13: 판타지, 14: 액션/무협, 15: BL/GL, 16: 공포 27: 현판, 28: 미스터리
    */
    private String name;

}
