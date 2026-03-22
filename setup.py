from setuptools import setup, find_packages

setup(
    name="bg_translations",
    version="0.0.1",
    description="Bulgarian translations for ERPNext",
    author="Lachezar Angelov",
    author_email="lachezar.angelov@domgrid.com",
    packages=find_packages(),
    zip_safe=False,
    include_package_data=True,
)
