package com.emosaac.server.config.s3;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.emosaac.server.common.exception.ArgumentMismatchException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Component
public class S3Uploader {

    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    public String bucket;

    @Value("${cloud.aws.region.static}")
    private String region;

    @Value("${cloud.aws.credentials.access-key}")
    private String accessKey;

    @Value("${cloud.aws.credentials.secret-key}")
    private String secretKey;

    public String upload(MultipartFile multipartFile, String dirName) throws IOException {
        File uploadFile = convert(multipartFile)
                .orElseThrow(()->new IllegalArgumentException("multipartFile에서 file로의 전환 실패"));

        return upload(uploadFile, dirName);
    }

    private String upload(File uploadFile, String dirName){

        String name = uploadFile.getName();
        if(name.length() > 8) {
            name = uploadFile.getName().substring(uploadFile.getName().length() - 7);
        }
        String fileName = dirName+"/"+ UUID.randomUUID()+ name;
        String uploadImageUrl = puts3(uploadFile, fileName);

        removeNewFile(uploadFile); //임시 파일 삭제
        return uploadImageUrl;
    }

    private void removeNewFile(File uploadFile) {
        if(uploadFile.delete()){
            log.info("임시 파일 삭제 성공");
        }else{
            log.info("임시 파일 삭제 실패");
        }
    }

    private String puts3(File uploadFile, String fileName) {
        amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, uploadFile)
                .withCannedAcl(CannedAccessControlList.PublicRead));
        return amazonS3Client.getUrl(bucket, fileName).toString();
    }


    private Optional<File> convert(MultipartFile multipartFile) throws IOException {
        File convertFile = new File(System.getProperty("user.dir")+"/"+ multipartFile.getOriginalFilename());

        String str = multipartFile.getOriginalFilename().toString().toLowerCase();

//        String extension = str.substring(str.length()-3, str.length());

        if(!str.contains("png") && !str.contains("jpg") && !str.contains("jpeg")){
            throw new ArgumentMismatchException("파일 확장자는 jpg png, jpeg만 가능합니다");
        }

        if(convertFile.createNewFile()){
            try(FileOutputStream fos = new FileOutputStream(convertFile)){
                fos.write(multipartFile.getBytes());
            }
            return Optional.of(convertFile);
        }
        return Optional.empty();
    }


    public void delete(String fileName) {
        DeleteObjectRequest deleteObjectRequest = new DeleteObjectRequest(this.bucket, fileName);
        S3Object object = amazonS3Client.getObject(bucket, fileName);
        amazonS3Client.deleteObject(deleteObjectRequest);
    }
}
