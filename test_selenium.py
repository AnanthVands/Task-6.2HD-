from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
import time

chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")
chrome_options.add_argument('--disable-gpu')
chrome_options.add_argument('--window-size=1920x1080')

driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()), options=chrome_options)

driver.get("http://localhost:8085")

time.sleep(3)

assert "The Book Haven" in driver.title, "Website did not load properly"

driver.save_screenshot("book_haven_screenshot.png")

driver.quit()

print("Test Passed! Website loaded successfully.")
