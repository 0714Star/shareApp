package com.jxufe_yzt.java.common;

import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

/**
 * 启动器启动时候打印 对应防伪码
 * @author yzt
 * @time 2024-12-13-17:37
 */
@Component
public class TerminalLogo {

    @PostConstruct
    public void PrintsLogo(){
        // 绘制LOGO
        String[] yzt = {
                "",
                "",
                "X            X       H----H---H         Y-----Y-----Y",
                "  \\        /                  /               |     ",
                "    \\    /                  /                 |      ",
                "       X                  /                   Y       ",
                "       |                /                     |      ",
                "       |              /                       |      ",
                "       X             H----H---H               Y      ",
                "",
                ""
        };

        for (String line : yzt) {
            System.out.println(line);
        }
    }

}
