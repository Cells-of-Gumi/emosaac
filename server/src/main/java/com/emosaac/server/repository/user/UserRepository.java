package com.emosaac.server.repository.user;

import com.emosaac.server.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("select u from User u where u.favoriteNovelGenre!= null and u.favoriteWebtoonGenre!= null and u.favoriteNovelGenre !='' and u.favoriteWebtoonGenre!= ''")
    List<User> findNotNewUser();

    @Query("select u from User u where u.gender= :gender and u.age = :age")
    List<User> findAgeAndGenUser(@Param("gender") Integer gender, @Param("age") Integer age);


    Optional<User> findByUserId(String userId); //프로바이더 아이디

    @Query("select u from User u where  u.userId = :userId")
    User findByMyId(@Param("userId") Long userId);


    @Query("select u from User u where  u.email = :userEmail")
    User findByUserEmail(@Param("userEmail")String userEmail);

    @Query("select u from User u where u.providerId =:ProviderId")
    Optional<User> findByProviderId(@Param("ProviderId")String provider);

    @Query(value = "select * from user u where u.provider_type = :providerType and u.email = :userEmail", nativeQuery = true)
    Optional<User> findByEmailANDProviderType(@Param("userEmail")String userEmail, @Param("providerType")String provider);

    @Query("select u from User u where u.nickName =:nickName and u.userId != :userId")
    Optional<User> findByUserNickName(@Param("nickName")String nickName, @Param("userId")Long userId);

}

