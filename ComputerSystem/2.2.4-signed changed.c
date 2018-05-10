#include<stdio.h>

/*
	测试强制转化有符号整数和无符号整数的结果
*/

void main() {
	short int v = -12345;
	unsigned short uv = (unsigned short)v;

	printf("v = %d, uv = %u\n", v, uv);

	system("pause");
}

/*
	输出结果为：
	v = -1 23 45, uv = 53191

	————————————
	在show_bytes.c文件中使用
		short x = 53191;
		show_bytes((byte_pointer)&x, sizeof(short));
		short x1 = -12345;
		show_bytes((byte_pointer)&x1, sizeof(short));
	的带的结果是一样的，都是：c7 c0
	
	—————————————
	也就是说，他们在内存的存储是一样的！

	因此，这样的强制转换，实际上只是改变了解释这些位的方式！

	因为：有符号整数是用补码解释的
	
	—————————————————
	53191的二进制为：1100111111000111，他使用正常的转化为10进制的方式。
	同样的，1100111111000111如果使用补码的方式，那么他的值就是-12345。
	计算方法是：-32768 + 16384 + 0 + 0 + 2048 + 1024 + 512 + 256 + 128 + 64 + 0 + 0 + 0 + 4 + 2 + 1 = -12345。

*/