#include<stdio.h>

typedef unsigned char *byte_pointer;

void show_bytes(byte_pointer start, size_t len) {
	size_t i;
	for (i = 0; i < len; ++i){
		printf("%.2x ", start[i]);
	}
	printf("\n");
}

void show_int(int x){
	show_bytes((byte_pointer)&x, sizeof(int));
}

void show_float(float x) {
	show_bytes((byte_pointer)&x, sizeof(float));
}

void show_pointer(void *x) {
	show_bytes((byte_pointer)&x, sizeof(void *));
}

void main() {
	int ival = 12345;
	float fval = (float)ival;
	int *pval = &ival;
	show_int(ival);
	show_float(fval);
	show_pointer(pval);

	system("pause");
}

/*
	因为：12345 16进制表示为：0x00003039

	原值：16进制 => 二进制
	原始值		   内存内部存储的值
	00 00 30 39 => 00000000  00000000  00110000  00111001  （一共是4个字节，表示一个数，记住这是正常顺序（大端法），当时在计算机内部顺序是不一样的）

	————————————————————————————————————————————————————————————————————————————————
	输出结果是： 
	39 30 00 00 => 00111001  00110000  00000000  00000000 （证明本机是小端法）
	00 e4 40 46 => 00000000  11100100  01000000  01000110
	48 fd 24 00 => 01001000  11111101  00100100  00000000

	——————————————————————————————————————————————————————————————
	发现：
	1、float和int他们的十进制数值虽然是一样的，当时在内存中确实不一样的
	2、int表示：0x00003039，float表示：0x4640e400

	他们转化为二进制有一部分是相等的：
	0000000000000000001 1000000111001
	          010001100 1000000111001 0000000000

	3、内存空间地址（也就是虚拟空间地址）的输出结果是和它所保存的值不一样的
*/