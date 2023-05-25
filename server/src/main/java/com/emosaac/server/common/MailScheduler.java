package com.emosaac.server.common;

import com.emosaac.server.domain.user.User;
import com.emosaac.server.dto.book.BookListResponse;
import com.emosaac.server.dto.recommand.UserBaseCfDto;
import com.emosaac.server.repository.recommand.RecommandQueryRepository;
import com.emosaac.server.repository.user.UserRepository;
import com.emosaac.server.service.recommand.RecommandService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.MailSendException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import javax.mail.MessagingException;
import javax.mail.SendFailedException;
import javax.mail.internet.MimeMessage;
import java.util.List;

@Component
@Slf4j
@RequiredArgsConstructor
public class MailScheduler {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final JavaMailSender mailSender;
    private final UserRepository userRepository;
    private final RecommandQueryRepository recommandQueryRepository;
    private final RecommandService recommandService;


//    @Scheduled(cron = "0 0/1 * * * ? ")  //1분마다
    @Scheduled(cron = "0 0 0 */7 * ?")  //7일마다
    public void mailSchedule() { //스케줄러 처리 필요

        List<User> users = userRepository.findNotNewUser();
        System.out.println(users.get(0));
        for (User user : users) {
            System.out.println(user.getUserName());
            List<BookListResponse> webtoonList = getRecommendedBooks(user.getUserId(), 0);
            List<BookListResponse> novelList = getRecommendedBooks(user.getUserId(), 1);
            BookListResponse webtoon = getRandomBook(webtoonList);
            BookListResponse novel = getRandomBook(novelList);
            String emailBody = createEmailBody(user.getUserName(), webtoon, novel);
            sendEmail(user.getEmail(), "[emosaac] " + "띵동! " + user.getUserName() + "님에게 꼭 맞는 새로운 추천이 왔어요!", emailBody);
//            break;
        }

        //test용입니다
//        User user = userRepository.findByMyId(2L);
//        System.out.println(user.getUserId());
//        List<BookListResponse> webtoonList = getRecommendedBooks(user.getUserId(), 0);
//        List<BookListResponse> novelList = getRecommendedBooks(user.getUserId(), 1);
//        BookListResponse webtoon = getRandomBook(webtoonList);
//        BookListResponse novel = getRandomBook(novelList);
//        String emailBody = createEmailBody(user.getUserName(), webtoon, novel);
//        sendEmail(user.getEmail(), "[emosaac] " + "띵동! " + user.getUserName() + "님에게 꼭 맞는 새로운 추천이 왔어요!", emailBody);
    }

    private List<BookListResponse> getRecommendedBooks(Long userId, int bookType) {
        String bookStr = recommandQueryRepository.findUserList(userId, bookType);
        return recommandService.findBookStrList(bookStr, bookType);
    }

    private BookListResponse getRandomBook(List<BookListResponse> books) {
        int randomIndex = (int) (Math.random() * books.size());
        return books.get(randomIndex);
    }

    private String createEmailBody(String userName, BookListResponse webtoon, BookListResponse novel) {

        StringBuilder emailBody = new StringBuilder();
        emailBody.append("<div style='margin: 20px; text-align: center;'>");
        emailBody.append("<h2 style='font-size: 25px; margin-top: 10px;'>emosaac이 " + userName + "님의 선호도를 분석하여</h2>");
        emailBody.append("<h1 style='font-size: 32px; font-weight: bold; margin-bottom: 20px;'>" + userName + "님만을 위한 작품을 추천해드립니다</h1>");
        emailBody.append("<hr style='border-top: 1px solid #d9d9d9; margin: 30px 0;'>");
        emailBody.append("<div style='display: flex; justify-content: center;'>");
        emailBody.append("<div style='margin-right: 60px;'>");
        emailBody.append("<h2 style='color: #333; font-size: 26px; margin-bottom: 20px;'>웹툰</h2>");
        emailBody.append("<a href='https://j8d203.p.ssafy.io/books/" + webtoon.getBookId() + "'><img src='" + webtoon.getThumbnail() + "' width='300' height='400' style='border-radius: 10px;'></a>");
        emailBody.append("<h3 style='color: #333; font-size: 20px; margin-bottom: 10px;'><a href='https://j8d203.p.ssafy.io/books/" + webtoon.getBookId() + "' style='color: #333; text-decoration: none;'>" + webtoon.getTitle() + "</a></h3>");
        emailBody.append("<p style='color: #999; font-size: 18px; margin-bottom: 20px;'>" + webtoon.getGenreName() + "</p>");
        emailBody.append("</div>");
        emailBody.append("<div style='margin-left: 60px;'>");
        emailBody.append("<h2 style='color: #333; font-size: 26px; margin-bottom: 20px;'>웹소설</h2>");
        emailBody.append("<a href='https://j8d203.p.ssafy.io/books/" + novel.getBookId() + "'><img src='" + novel.getThumbnail() + "' width='300' height='400' style='border-radius: 10px;'></a>");
        emailBody.append("<h3 style='color: #333; font-size: 20px; margin-bottom: 10px;'><a href='https://j8d203.p.ssafy.io/books/" + novel.getBookId() + "' style='color: #333; text-decoration: none;'>" + novel.getTitle() + "</a></h3>");
        emailBody.append("<p style='color: #999; font-size: 18px; margin-bottom: 20px;'>" + novel.getGenreName() + "</p>");
        emailBody.append("</div>");
        emailBody.append("</div>");
        emailBody.append("<p style='font-size: 18px; margin-top: 30px; text-align: center;'>추천 작품이 마음에 드셨나요? 바로 <a href='https://j8d203.p.ssafy.io'>emosaac</a>에서 확인해보세요.</p>");
        emailBody.append("</div>");

        return emailBody.toString();

    }


    public void sendEmail(String toAddress, String subject, String body)  {
        MimeMessage message = mailSender.createMimeMessage();

        try{
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(toAddress);
            helper.setSubject(subject);
            helper.setText(body, true);
            mailSender.send(message);

        }catch (MessagingException | MailSendException e){
            return;
        }
    }
}
