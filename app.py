# from flask import Flask, redirect, render_tables
# import pandas as pd

# # Install Java, Spark, and Findspark
# !apt-get install openjdk-8-jdk-headless -qq > /dev/null
# !wget -q http://www-us.apache.org/dist/spark/spark-2.4.4/spark-2.4.4-bin-hadoop2.7.tgz
# !tar xf spark-2.4.4-bin-hadoop2.7.tgz
# !pip install -q findspark

# # Set Environment Variables
# import os
# os.environ["JAVA_HOME"] = "/usr/lib/jvm/java-8-openjdk-amd64"
# os.environ["SPARK_HOME"] = "/content/spark-2.4.4-bin-hadoop2.7"

# # Start a SparkSession
# import findspark
# findspark.init()

# !wget https://jdbc.postgresql.org/download/postgresql-42.2.9.jar

# # Start Spark session
# from pyspark.sql import SparkSession
# spark = SparkSession.builder.appName("ETL").config("spark.driver.extraClassPath","/content/postgresql-42.2.9.jar").getOrCreate()

# from pyspark import SparkFiles
# # Load in user_data.csv from S3 into a DataFrame
# url = "https://<bucket name>.s3.amazonaws.com/user_data.csv"
# spark.sparkContext.addFile(url)

# user_data_df = spark.read.option('header', 'true').csv(SparkFiles.get("user_data.csv"), inferSchema=True, sep=',')
# user_data_df.show(10)

# # Load in user_payment.csv from S3 into a DataFrame

# url = "https://<bucket name>.s3.amazonaws.com/user_payment.csv"
# spark.sparkContext.addFile(url)

# user_payment_df = spark.read.option('header', 'true').csv(SparkFiles.get("user_payment.csv"), inferSchema=True, sep=',')
# user_payment_df.show(10)

# # Join the two DataFrame
# joined_df= user_data_df.join(user_payment_df, on="username", how="inner")
# joined_df.show()

# # Load in a sql function to use columns
# from pyspark.sql.functions import col

# # Filter for only columns with active users
# cleaned_df = dropna_df.filter(col("active_user")  == True)
# cleaned_df.show()

# # Create user dataframe to match active_user table
# clean_user_df = cleaned_df.select(["id", "first_name", "last_name", "username"])
# clean_user_df.show()

# # Create user dataframe to match billing_info table
# clean_billing_df = cleaned_df.select(["billing_id", "street_address", "state", "username"])
# clean_billing_df.show()

# # Create user dataframe to match payment_info table
# clean_payment_df = cleaned_df.select(["billing_id", "cc_encrypted"])
# clean_payment_df.show()

# # Configure settings for RDS
# mode = "append"
# jdbc_url="jdbc:postgresql://<endpoint>:5432/my_data_class_db"
# config = {"user":"root", 
#           "password": "<password>", 
#           "driver":"org.postgresql.Driver"}

# clean_user_df.write.jdbc(url=jdbc_url, table='active_user', mode=mode, properties=config)

# from pyspark import SparkFiles
# url ="https://s3.amazonaws.com/<bucket-name>/user_data.csv"
# spark.sparkContext.addFile(url)
# user_data_df = spark.read.csv(SparkFiles.get("user_data.csv"), sep=",", header=True)