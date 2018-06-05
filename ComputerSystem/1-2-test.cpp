#include<stdio.h>
#include<stdlib.h>

void main2() {
	int a = 0x3039;
	float b = (float)a;

	size_t i;
	size_t len = sizeof(float);

	for (i = 0; i < len; ++i){
		printf("%.8x ", b);
	}

	system("pause");
}