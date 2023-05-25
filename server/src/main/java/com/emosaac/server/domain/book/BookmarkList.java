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
public class BookmarkList {

    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL, orphanRemoval = true) //orphanRemoval 없으면 삭제가 안됨.
    private final List<BookMark> bookmarkList = new ArrayList<>();

    public int size(){
        return bookmarkList.size();
    }

    public boolean toggleBookmark(BookMark bookMark){
        if(contains(bookMark.getUser().getUserId())){
            removeBookmark(bookMark);
            return false;
        }
        bookmarkList.add(bookMark);
        return true;
    }

    private boolean contains(Long userId){
        return bookmarkList.parallelStream().anyMatch(l -> l.ownedBy(userId));
    }

    private void removeBookmark(BookMark bookMark){
        Long userId = bookMark.getUser().getUserId();
        BookMark removeTarget = bookmarkList.parallelStream()
                .filter(l -> l.ownedBy(userId))
                .findAny().orElseThrow(() -> new ResourceNotFoundException("이미 북마크를 해제했습니다."));
        bookmarkList.remove(removeTarget);
    }

}
