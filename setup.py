#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat Dec 14 21:05:44 2019

@author: naren
"""

from setuptools import setup, find_packages

requires = [
    'flask',
    'flask_restful'
]

setup(
    name='Hospital Management System',
    version='0.0',
    description='Hospital Management System Mini Project',
    author='Narendra Rajpoot',
    author_email='nrajpoot1146@gmail.com',
    packages=find_packages(),
    include_package_data=True,
    install_requires=requires
)
