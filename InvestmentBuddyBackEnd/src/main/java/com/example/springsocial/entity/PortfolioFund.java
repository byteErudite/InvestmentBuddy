package com.example.springsocial.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "portfolio_fund")
public class PortfolioFund {
    @Id
    @Column(name = "fund_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private long name;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getName() {
        return name;
    }

    public void setName(long name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "PortfolioFund {" +
                "id=" + id +
                ", name=" + name +
                '}';
    }
}
