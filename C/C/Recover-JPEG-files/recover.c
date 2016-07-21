/**
 * recover.c
 *
 * Computer Science 50
 * Problem Set 4
 *
 * Recovers JPEGs from a forensic image.
 */
 
#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>

// struct to read claster
typedef struct
{
    uint8_t firstJPG;
    uint8_t secondJPG;
    uint8_t thirdJPG;
    uint8_t fourthJPG;
    uint8_t content[508];
} JPG;

int main(int argc, char* argv[])
{    
    FILE* file = fopen("card.raw", "r");
    
    int start = 0;
    int fileIndex = 0;            
    char title[8];
    
    JPG claster;

    FILE* img = NULL;
    
    // read FAT-disk
    while(fread(&claster, sizeof(claster), 1, file) == 1)
    {
        // check the beginning of JPEG-file
        if(claster.firstJPG == 0xff && claster.secondJPG == 0xd8 && claster.thirdJPG == 0xff 
             && (claster.fourthJPG == 0xe0 || claster.fourthJPG == 0xe1))
        {
            // close current image
            if(start)
            {
                fclose(img);
            }
            
            // generete file name and write down to 'title'
            sprintf(title, "%i%i%i.jpg", (fileIndex/100), (fileIndex/10), (fileIndex%10));
            
            // open new image
            img = fopen(title, "a");
            
            start = 1;
            // iterate in order to next name
            fileIndex++;
        }
        // record if the first JPEG have been found
        if(start)
        {
            // write CLASTER to outfile
            fwrite(&claster, sizeof(claster), 1, img);           
        }          
    }            
    
    // close output
    fclose(img); 
    
    // close FAT-disk
    fclose(file);    

    return 0;
}
