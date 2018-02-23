java.exe -jar "C:\Users\Max\AppData\Roaming\npm\node_modules\yuicompressor\build\yuicompressor-2.4.8.jar" main.css -o main.min.css.tmp
java.exe -jar "C:\Users\Max\AppData\Roaming\npm\node_modules\yuicompressor\build\yuicompressor-2.4.8.jar" elements.css -o elements.min.css.tmp
java.exe -jar "C:\Users\Max\AppData\Roaming\npm\node_modules\yuicompressor\build\yuicompressor-2.4.8.jar" animations.css -o animations.min.css.tmp
java.exe -jar "C:\Users\Max\AppData\Roaming\npm\node_modules\yuicompressor\build\yuicompressor-2.4.8.jar" spinner.css -o spinner.min.css.tmp
java.exe -jar "C:\Users\Max\AppData\Roaming\npm\node_modules\yuicompressor\build\yuicompressor-2.4.8.jar" shake.css -o shake.min.css.tmp
java.exe -jar "C:\Users\Max\AppData\Roaming\npm\node_modules\yuicompressor\build\yuicompressor-2.4.8.jar" util.css -o util.min.css.tmp


copy main.min.css.tmp /B + elements.min.css.tmp + animations.min.css.tmp + spinner.min.css.tmp + shake.min.css.tmp + util.min.css.tmp/B min.css

del /F /Q *.min.css.tmp