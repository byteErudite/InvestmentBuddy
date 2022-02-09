package com.example.springsocial.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.example.springsocial.util.Bank;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@Table(name = "card")
@EqualsAndHashCode
public class CardEntity {

    @Id
    @Column(name = "card_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    private String number;
    private String holderName;

    @Enumerated(EnumType.STRING)
    private Bank bank;

    private Integer cvv;
    private Date expiry;
    private boolean isDisable;
    private Double ammountDue;
    
    @OneToMany(mappedBy = "card", fetch = FetchType.LAZY,
            cascade = CascadeType.ALL)
    private List<TransactionEntity> transactions = new ArrayList<>();

}
