#!/bin/bash

read params;

option=$(echo $params | awk -F";" '{print $1}');


if [[ $option = "load" ]]; then
	songPath=$(echo $params | awk -F";" '{print $2}');
	mpg123 $songPath
elif [[ $option = "play" ]]; then
	echo "play"
elif [[ $option = "pause" ]]; then
	echo "pause"
elif [[ $option = "next" ]]; then
	echo "next"
elif [[ $option = "prev" ]]; then
	echo "prev"
elif [[ $option = "shuffle" ]]; then
	echo "shuffle"
else
	echo "replay"
fi
