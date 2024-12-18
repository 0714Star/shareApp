package com.jxufe_yzt.java;

import com.jxufe_yzt.java.utils.TokenUtil;
import org.apache.el.parser.Token;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

/**
 * @author yzt
 * @time 2024-12-18-16:18
 */
@SpringBootTest
public class TokenUtilTest {

    @Test
    public void test(){
        String xhy = TokenUtil.createToken("{a : '123'}");
        System.out.println(xhy);
        TokenUtil.deToken(xhy);
        return ;

    }

}
