from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
import os
import time

os.environ['WDM_LOCAL'] = '1'
os.environ['WDM_CACHE_DIR'] = './.wdm'

driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()))

driver.get("http://localhost:8085") 

time.sleep(3)

assert "The Book Haven" in driver.title, "Website did not load properly"

driver.save_screenshot("book_haven_screenshot.png")

driver.quit()

print("Test Passed! Website loaded successfully.")
