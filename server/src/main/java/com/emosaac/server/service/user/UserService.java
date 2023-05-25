package com.emosaac.server.service.user;

import com.amazonaws.services.s3.model.AmazonS3Exception;
import com.emosaac.server.common.exception.ArgumentMismatchException;
import com.emosaac.server.common.exception.ResourceNotFoundException;
import com.emosaac.server.config.s3.S3Uploader;
import com.emosaac.server.domain.book.Genre;
import com.emosaac.server.domain.user.User;
import com.emosaac.server.dto.genre.GenreResponse;
import com.emosaac.server.dto.user.UserGenreRequest;
import com.emosaac.server.dto.user.UserRequest;
import com.emosaac.server.dto.user.UserRequestFile;
import com.emosaac.server.dto.user.UserResponse;
import com.emosaac.server.repository.genre.GenreRepository;
import com.emosaac.server.repository.user.UserRepository;
import com.emosaac.server.service.CommonService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.mysql.cj.conf.PropertyKey.logger;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {
    private final UserRepository userRepository;
    private final GenreRepository genreRepository;
    private final String baseImg = "static/user/d5be5034-79c6-4ef7-861a-0f119247c9c6age.png";
    private final S3Uploader s3Uploader;
    private final CommonService commonService;
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    public UserResponse getUser(Long userId) {
        User user = commonService.getUser(userId);
        return UserResponse.from(user);
    }

    @Transactional
    public Long updateUserInfo(Long userId, UserRequest request) {

        User originUser = commonService.getUser(userId);

        if (nickNameCheck(request.getNickName(), userId) == true) {
            throw new ArgumentMismatchException("닉네임 중복입니다");
        }

        originUser.setUserInfo(request); //이미지 링크 수정 빼고 업데이트

        String originImg = originUser.getImageUrl();
        String newImg = request.getImageUrl();
        logger.info("======newImg: {}",newImg);

        // If new image is null or empty, set default image
        if (newImg == null || newImg.isEmpty()) {
            logger.info("nullImg");
//            originUser.updateImageUrl(baseImg);
        } else {
            logger.info("newImg");
            // Update image URL and delete original image if URL has changed
            originUser.updateImageUrl(newImg);
            if (!newImg.equals(originImg)) {
                deleteS3Image(originImg);
            }
        }

        return userId;
    }


    private void deleteS3Image(String imageUrl) {
        if (imageUrl == null || imageUrl.equals(baseImg)) {
            return;
        }

        try {
            s3Uploader.delete(imageUrl);
        } catch (AmazonS3Exception e) {
            logger.info("삭제할 파일이 서버에 존재하지 않습니다");
//            return;
//            throw new ResourceNotFoundException("삭제할 파일이 서버에 존재하지 않습니다");
        }
    }

    public boolean nickNameCheck(String nickName, Long userId) {
        return userRepository.findByUserNickName(nickName, userId)
                .map(user -> true)
                .orElse(false);
    }

    ///<----------- 장르

    //나의 선호 장르 조회
    public List<GenreResponse> getUserFavoriteGerne(Long userId, Integer typeCode) {
        User user = commonService.getUser(userId);
        String str = (typeCode == 0) ? user.getFavoriteWebtoonGenre() : user.getFavoriteNovelGenre(); //선호 장르에 반영

        return stringToGenreList(str).stream().map((genre) -> new GenreResponse(genre)).collect(Collectors.toList());
    }

    //선호 장르 변경(안쓸 것같음)
    @Transactional
    public List<GenreResponse> updateUserGenre(Long userId, UserGenreRequest request, Integer typeCode) {
        User user = commonService.getUser(userId);
        String str = listToFavoriteString(request);
        switch (typeCode) {
            case 0:
                user.updateFavoriteNovelGenre(str);
                break;
            case 1:
                user.updateFavoriteWebtoonGenre(str);
                break;
            default:
                break;
        }
        return getUserFavoriteGerne(user.getUserId(), typeCode);
    }

    //선호 장르 컬럼에 반영할 문자열(10^11^12)
    public String listToFavoriteString(UserGenreRequest request) {
        StringBuilder str = new StringBuilder();
        if (!request.getGerne().isEmpty()) {
            for (Long tmp : request.getGerne()) {
                Genre genre = commonService.getGenre(tmp);
                str.append(genre.getGerneId()).append("^");
            }
        }
        return str.toString();
    }

    public List<Genre> stringToGenreList(String request) {
        List<Genre> genreList = new ArrayList<>();
        if (request != null) {
            String[] genreIds = request.split("\\^");
            for (String genreId : genreIds) {
                Genre genre = commonService.getGenre(Long.parseLong(genreId));
                genreList.add(genre);
            }
        }
        return genreList;
    }

}
