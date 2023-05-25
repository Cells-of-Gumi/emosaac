package com.emosaac.server.domain.book;

import com.emosaac.server.common.exception.ResourceNotFoundException;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.CascadeType;
import javax.persistence.Embeddable;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@Embeddable
public class ReadBookList {

    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL, orphanRemoval = true)
    private final List<ReadBook> readBookList = new ArrayList<>();

    public int size(){
        return readBookList.size();
    }

    public boolean toggleBookmark(ReadBook readBook){
        if(contains(readBook.getUser().getUserId())){
            removeBookmark(readBook);
            return false;
        }
        readBookList.add(readBook);
        return true;
    }

    private boolean contains(Long userId){
        return readBookList.parallelStream().anyMatch(l -> l.ownedBy(userId));
    }

    private void removeBookmark(ReadBook readBook){
        Long userId = readBook.getUser().getUserId();
        ReadBook removeTarget = readBookList.parallelStream()
                .filter(l -> l.ownedBy(userId))
                .findAny().orElseThrow(() -> new ResourceNotFoundException("이미 읽음여부를 해제했습니다."));
        readBookList.remove(removeTarget);
    }
}
