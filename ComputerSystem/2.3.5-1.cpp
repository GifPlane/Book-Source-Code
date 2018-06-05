#include<stdio.h>
#include<stdlib.h>

union a {
	char c;
	int i[2];
	double v;
};

void main(){

	a aa;
	aa.c = 1;
	aa.v = 111.11;

	printf("%d", aa.c);

	system("pause");

}