#!/bin/bash

list="data/items.txt"
array="data/items.js"

echo -n "[" >$array
cat $list|while read item 
do
    url="$(curl 'http://cooltext.com/PostChange' -H 'Cookie: ASP.NET_SessionId=n2tloslsxcfw2s3epucczxdt; recentlyUsedColors0=#FC0F3E; recentlyUsedColors1=#F9A148; recentlyUsedColors2=#85DB30; recentlyUsedColors3=#1F95EF; recentlyUsedColors4=#CABEDD; recentlyUsedColors5=#594C47; recentlyUsedColors6=#002F47; __utma=170232063.451545336.1412096393.1413938042.1413940393.12; __utmb=170232063.2.10.1413940393; __utmc=170232063; __utmz=170232063.1412096393.1.1.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided)' -H 'Origin: http://cooltext.com' -H 'Accept-Encoding: gzip,deflate' -H 'Accept-Language: en-US,en;q=0.8' -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36' -H 'Content-Type: application/x-www-form-urlencoded; charset=UTF-8' -H 'Accept: */*' -H 'Referer: http://cooltext.com/Logo-Design-Still-Cool-Button' -H 'X-Requested-With: XMLHttpRequest' -H 'Connection: keep-alive' --data "LogoID=1094845170&Text=$item&TextSize=20&TextColor_color=%23FFFFFF&TextOutline=0&TextOutlineColor_color=%23FFFFFF&TextShadow=2&TextShadowColor_color=%23000000&TextOffsetX=0&TextOffsetY=0&Shape=0&ButtonWidth=150&AutoWidth=on&ButtonHeight=30&AutoHeight=on&ShapeFill=0&ButtonColor1_color=%23366092&ButtonColor2_color=%23FFFFFF&ShapeOutline=0&ShapeOutlineColor_color=%23000000&Shadow=2&ShadowColor_color=%234E4E4E&RenderEffect=6&MouseOverEffect=0" --compressed|cut -d\" -f8|cut -d\\ -f1)"
    wget "$url" -O "res/items/${item}.png"
    echo -n "\"$item\"," >> $array
done

echo -n "]" >> $array

sed -i 's/,]/]/g' $array
