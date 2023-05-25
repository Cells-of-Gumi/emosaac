package com.emosaac.server.domain.user;

import com.emosaac.server.domain.book.Book;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@DynamicUpdate
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Research {
    @Id
    @Column(name = "RESEARCH_NO")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long researchId;

    @OneToOne
    @JoinColumn(name = "BOOK_NO")
    private Book book;

    private Long gerneId;

    private int type;

}
