package com.emosaac.server.domain.tag;

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
public class TagToon{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TAG_CD")
    private Long tagId;

    @Column(name = "TAG_NAME")
    private String name;

    @Column(name = "BOOK_NO_LIST")
    private String bookList;

}
