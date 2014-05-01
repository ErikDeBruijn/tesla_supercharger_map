import sys
import urllib
from lxml.html import fromstring

def main(argv):
	#Extracts URLs from superchargers.txt to crawl supercharger pages for stall numbers
	
    sc_file = open("superchargers.txt","rw")
    url_prefix = "url: http://www.teslamotors.com/supercharger/"
    lines = sc_file.readlines()

    station = ''
    for line in lines:
        line=line.rstrip('\n')

		#Get station name
        if "name:" in line:
			words = line.split(": ")
			station = words[1]
			
		#Crawl supercharger webpage if it has an official page listed
        if url_prefix in line:
            url = line.split(" ")[1]
            content = urllib.urlopen(url).read()
            doc = fromstring(content)
            elements = doc.find_class('stalls')
            if elements > 1:
                element = elements[0]
                inner_text = element.text_content()
				#Change inner text from unicode to ascii 
                words = inner_text.encode('ascii','ignore')
				#Format is "Charging Stalls – <INTEGER>" 
				#Extract integer from words
                int_array = [int(s) for s in words.split() if s.isdigit()]
                num_stalls = int_array[0]
                print "%s: %d" % (station, num_stalls)
            else:
                print "%s: no data for stalls " % (station)

if __name__ == "__main__":
    main(sys.argv[1:])
