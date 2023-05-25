package com.emosaac.server.repository.user;

import com.emosaac.server.domain.user.UserRefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRefreshTokenRepository extends JpaRepository<UserRefreshToken, Long> {
    UserRefreshToken findByUserId(String userId);

//    UserRefreshToken findByUserEmail(String userEmail);

//    UserRefreshToken findByUserEmailAndRefreshToken(String userEmail, String refreshToken);

    UserRefreshToken findByUserIdAndRefreshToken(String userId, String refreshToken);

}
