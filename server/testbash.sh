#!/bin/sh
echo -e 'Content-Type: text/html;\n'

str=$QUERY_STRING
#str='function=digitalRead&param=13'

# It seems that we can't use () and array here...

key=""
value=""

for pair in ${str//&/ }
do
	first=1
	for i in ${pair//=/ }
	do
		if [ $first -eq 1 ]
		then
			first=0
			key="$key $i"
		else	
			value="$value $i"
		fi	
	done
done


i=0
funcName=""

for k in $key
do
	let "i+=1"
	if [ $k == "function" ]
	then 
		j=0
		for v in $value
		do
			let "j+=1"
			if [ $i -eq $j ]
			then
				funcName=$v
				break
			fi
		done
	fi
done

i=0
for k in $key
do
	let "i+=1"
	if [ $k == "param" ]
	then
		j=0
		for v in $value
		do
			let "j+=1"
			if [ $i -eq $j ]
			then
				param=$v
				break
			fi
		done
	fi
done


if [ $funcName == "digitalWrite" ]
then
	echo 115 > /sys/class/gpio/export
	echo out > /sys/class/gpio/D13/direction
	if [ $param == "HIGH" ]
	then 
		echo 1 > /sys/class/gpio/D13/value
		echo -e "{result:\"OK\"}"
	elif [ $param == "LOW" ]
	then
		echo 0 > /sys/class/gpio/D13/value
		echo -e "{result:\"OK\"}"
	fi
elif [ $funcName == "digitalRead" ]
then
	echo ""
elif [ $funcName == "pinMode" ]
then
	echo ""
fi
