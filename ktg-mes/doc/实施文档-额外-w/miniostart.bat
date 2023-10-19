set MINIO_ROOT_USER=admin
set MINIO_ROOT_PASSWORD=12345678
minio.exe server --console-address :3030 --address :3031 d:/tools/minio/minioData/data1 d:/tools/minio/minioData/data2

rem  minio.exe server --console-address :3030    d:/tools/minio/minioData/data 
rem ;; 3030是api对应端口，     3031是控制台页面对应端口----http://127.0.0.1:3030 
rem   运行出错  ： Unable to validate credentials inherited from the shell environment: Invalid credentials
rem   出错原因是密码设置不足8位，一开始 密码是 123456，
rem   http://127.0.0.1:3030  登录进去后 ，就可以创建  accessKey和 secretKey，bucketName

rem  tskill.exe  minio , 重新运行start 