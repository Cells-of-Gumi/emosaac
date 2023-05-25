package com.emosaac.server.domain.recommand;

import com.emosaac.server.domain.BaseEntity;
import com.emosaac.server.domain.user.User;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name="TOTAL_BY_AGE_GENDER_MODEL")
public class TotalByAgeAndGenderModel extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ITEM_NO")
    private Integer id;

    private Integer age;

    private Integer gender;

    @JsonManagedReference
    private String bookNoList;

    @Column(name="TYPE_CD")
    private Integer typeCode;
}
