package com.emosaac.server.common;

import com.emosaac.server.domain.user.User;
import com.emosaac.server.dto.genre.TotalResponse;
import com.emosaac.server.dto.recommand.UserBaseCfDto;
import com.emosaac.server.dto.user.UserResponse;
import com.emosaac.server.repository.user.UserRepository;
import com.emosaac.server.service.genre.GenreService;
import com.emosaac.server.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
@Slf4j
@RequiredArgsConstructor
public class Scheduler {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    RestTemplate restTemplate = new RestTemplate();

//    @Scheduled(cron = "0 0 0 * * *")  //매일 12시 정각에
    @Scheduled(cron = "0 0 * * * *") //매 시간 정각에
//    @Scheduled(cron = "0 0/5 * * * ? ")  //5분마다
//    @Scheduled(cron = "0/1 * * * * ?")
    @Transactional
    public void getTotalGenre() { //스케줄러 처리 필요

        String url = "http://j8d203.p.ssafy.io:8000/recommand/";

        logger.info("================ Schedule START ===================");


        UserBaseCfDto ageAndGenDto = restTemplate.getForObject(url + "total/ageAndGen", UserBaseCfDto.class);
        UserBaseCfDto userBaseCfDto = restTemplate.getForObject(url + "cf/schedule", UserBaseCfDto.class);
        UserBaseCfDto userPredictfDto = restTemplate.getForObject(url + "predict", UserBaseCfDto.class);
//        UserBaseCfDto genreCfDto = restTemplate.getForObject(url + "total/genre", UserBaseCfDto.class);

//        System.out.println(userBaseCfDto);
//        System.out.println(userPredictfDto);

        logger.info("================ Schedule DONE ===================");
    }
}
