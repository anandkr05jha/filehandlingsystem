package com.org.api.util;

public class ValidateEntity {

    public static boolean checkExtension(String mimeType) {
        String type = mimeType.split("/")[0];
        if (type.equalsIgnoreCase("text") || type.equalsIgnoreCase("plain"))
            return true;
        return false;
    }

}
