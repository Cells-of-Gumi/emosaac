package com.emosaac.server.security;


import com.emosaac.server.common.exception.ResourceNotFoundException;
import com.emosaac.server.domain.user.User;
import com.emosaac.server.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {
        System.out.println("loadUserByUsername email "+email);
        User user = userRepository.findByUserId(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found with email : " + email)
        );

        return UserPrincipal.create(user);
    }

    @Transactional
    public UserDetails loadUserByProvideId(String provideId)
            throws UsernameNotFoundException {
        System.out.println("loadUserByprovideId provideId "+provideId);
        User user = userRepository.findByProviderId(provideId)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found with provideId : " + provideId)
                );

        return UserPrincipal.create(user);
    }

    @Transactional
    public UserDetails loadUserById(Long id) {
        User user = (User) userRepository.findById(id).orElseThrow(
            () -> new ResourceNotFoundException("User", "id", id)
        );

        return UserPrincipal.create(user);
    }
}