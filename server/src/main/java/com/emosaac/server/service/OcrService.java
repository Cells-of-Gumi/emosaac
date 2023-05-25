package com.emosaac.server.service;

import com.emosaac.server.domain.book.Book;
import com.emosaac.server.domain.book.Hit;
import com.emosaac.server.domain.book.ReadBook;
import com.emosaac.server.domain.user.User;
import com.emosaac.server.dto.book.BookListResponse;
import com.emosaac.server.repository.book.BookRepository;
import com.emosaac.server.repository.readbook.ReadRepository;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.vision.v1.*;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.google.api.gax.core.FixedCredentialsProvider;
import org.springframework.web.multipart.MultipartFile;
import com.google.protobuf.ByteString;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OcrService {

    private final CommonService commonService;
    private final BookRepository bookRepository;
    private final ReadRepository readRepository;
    private final ResourceLoader resourceLoader;

    public String detectTextGcs(MultipartFile file) throws IOException {

        List<AnnotateImageRequest> requests = new ArrayList<>();

        ByteString byteString = ByteString.copyFrom(file.getBytes());
        Image image = Image.newBuilder().setContent(byteString).build();

        Feature feat = Feature.newBuilder().setType(Feature.Type.TEXT_DETECTION).build();
        AnnotateImageRequest request =
                AnnotateImageRequest.newBuilder().addFeatures(feat).setImage(image).build();
        requests.add(request);

        Resource resource = resourceLoader.getResource("classpath:woven-name-382111-f4f2ed422bd9.json");
        GoogleCredentials credentials = GoogleCredentials.fromStream(resource.getInputStream());

        // Set the ImageAnnotatorSettings with the credentials
        ImageAnnotatorSettings settings =
                ImageAnnotatorSettings.newBuilder().setCredentialsProvider(FixedCredentialsProvider.create(credentials)).build();

        String strRes = "";

        try (ImageAnnotatorClient client = ImageAnnotatorClient.create(settings)) {
            BatchAnnotateImagesResponse response = client.batchAnnotateImages(requests);
            List<AnnotateImageResponse> responses = response.getResponsesList();
            for (AnnotateImageResponse res : responses) {
                if (res.hasError()) {
                    System.out.format("Error: %s%n", res.getError().getMessage());
                    return null;
                }

                // For full list of available annotations, see http://g.co/cloud/vision/docs
                for (EntityAnnotation annotation : res.getTextAnnotationsList()) {
                    BoundingPoly boundingPoly = annotation.getBoundingPoly();
                    List<Vertex> vertices = boundingPoly.getVerticesList();
                    int width = vertices.get(2).getX() - vertices.get(0).getX();
                    System.out.println(width);
                    int height = vertices.get(2).getY() - vertices.get(0).getY();
                    System.out.println(height);
                    int textSizeThreshold = 100000; // 필요한 텍스트 크기
                    if (width * height > textSizeThreshold) {
                        strRes = annotation.getDescription().substring(20, annotation.getDescription().length()).replaceAll("[^\n/(),.+ㄱ-ㅎㅏ-ㅣ가-힣\\[\\]]", " ");
                        String[] strList = {"웹툰", "웹소설", "일 전", "신작", "관심", "NEW", "다운로드", "관심웹툰", "전체", "지금", "최근", "무료", "voice",
                                "MY", "TALK", "새 이야기", "UP", "더보기", "이어보기", "연재중", "완결", "보관함", "좋아요", "구매 작품", "다운로드",
                                "대여", "소장", "책갈피", "편집", "전체", "업데이트 순", "임시저장", "댓글", "내 쿠키", "다음화 보기", "일전"};
                        strRes = Arrays.stream(strList)
                                .filter(strRes::contains)
                                .reduce(strRes, (s, c) -> s.replaceAll(c, ""));
//                        System.out.println(strRes);
                        System.out.println("---------------");
                        break;
                    }
                }
            }
        }

        return strRes.trim();
    }

    @Transactional
    public List<BookListResponse> postOcrFileAndRead(MultipartFile multipartFile, Long userId, int typeCd) throws IOException {
        List<BookListResponse> responses = new ArrayList<>();

        String text = detectTextGcs(multipartFile);
        if (text == null) {
            return responses;
        }

        String[] textList = text.split("\n");
        List<Book> bookList = new ArrayList<>();

        for (String str : textList) {
            str = str.trim();
            if (str.length() < 2) {
                continue;
            }

            List<Book> books = bookRepository.findBookname(typeCd, str);
            if (!books.isEmpty() && !bookList.contains(books.get(0))) { //
                bookList.add(books.get(0));
            }
        }

        bookList.forEach((b) -> responses.add(new BookListResponse(b)));
        //읽음처리
        postRead(bookList, userId);

        return responses;
    }


    @Transactional
    public void postRead(List<Book> bookList, Long userId) {
        User user = commonService.getUser(userId);

        for (Book book : bookList) {
            if (!readRepository.existsByBookIdAndUserId(book.getBookId(), userId).isPresent()) {
                ReadBook readBook = ReadBook.builder().book(book).user(user).build();
                readRepository.save(readBook);
            }
        }
    }

}
