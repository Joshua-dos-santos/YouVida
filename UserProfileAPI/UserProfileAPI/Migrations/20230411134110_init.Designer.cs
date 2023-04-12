﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using UserProfileAPI;

#nullable disable

namespace UserProfileAPI.Migrations
{
    [DbContext(typeof(ApplicationContext))]
    [Migration("20230411134110_init")]
    partial class init
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("UserProfileAPI.Models.User", b =>
                {
                    b.Property<Guid>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("Bio")
                        .HasColumnType("longtext");

                    b.Property<DateTime>("Birthdate")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Email")
                        .HasColumnType("longtext");

                    b.Property<DateTime>("LastLogin")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Name")
                        .HasColumnType("longtext");

                    b.Property<string>("Profilepic")
                        .HasColumnType("longtext");

                    b.HasKey("UserId");

                    b.ToTable("User");
                });

            modelBuilder.Entity("UserProfileAPI.Models.UserFollower", b =>
                {
                    b.Property<Guid>("UserFollowerId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("FollowerId")
                        .HasColumnType("longtext");

                    b.Property<string>("UserId")
                        .HasColumnType("longtext");

                    b.HasKey("UserFollowerId");

                    b.ToTable("UserFollower");
                });

            modelBuilder.Entity("UserProfileAPI.Models.UserPost", b =>
                {
                    b.Property<Guid>("UserPostId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<Guid>("PostId")
                        .HasColumnType("char(36)");

                    b.Property<string>("UserId")
                        .HasColumnType("longtext");

                    b.HasKey("UserPostId");

                    b.ToTable("UserPost");
                });
#pragma warning restore 612, 618
        }
    }
}