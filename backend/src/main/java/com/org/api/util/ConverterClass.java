package com.org.api.util;

public class ConverterClass {

    public static Integer convertFileInMB(Long size) {
        int kilobytes = (int) (size / 1024);
        int megabytes = (kilobytes / 1024);
        return megabytes;
    }
}
