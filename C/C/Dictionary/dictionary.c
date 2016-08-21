/****************************************************************************
 * dictionary.c
 *
 * Computer Science 50
 * Problem Set 5
 *
 * Implements a dictionary's functionality.
 ***************************************************************************/

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <ctype.h>

#include "dictionary.h"

// allocate root node
node* root = NULL;
node* cursor = NULL;

// to count the dictionary size
int countDict = 0;

// to calculate index for char 
int indexOf(int ch)
{
    return (ch == 39) ? 26 : tolower(ch)-97;
}

/**
 * Returns true if word is in dictionary else false.
 */
bool check(const char* word)
{
    cursor = root;
    int i = 0, index = 0;
    
    while(word[i])
    {
        index = indexOf(word[i]);
    
        if(cursor->children[index] == NULL)
        {
            return false;
        }
        else if(cursor->children[index] != NULL)
        {
            cursor = cursor->children[index];
        }
        i++;
    }
    
    if(cursor->is_word) return true;
    else return false;
}

/**
 * Loads dictionary into memory.  Returns true if successful else false.
 */
bool load(const char* dictionary)
{    
    FILE* fp = fopen(dictionary, "r");
    if (fp == NULL)
    {
        printf("Could not open %s.\n", dictionary);
        return 1;
    }
    
    root = malloc(sizeof(node));
    cursor = root;
    int i, index = 0;

    // spell-check each word in text
    for (int c = fgetc(fp); c != EOF; c = fgetc(fp))
    {
        // allow only alphabetical characters and apostrophes
        if (isalpha(c) || (c == '\'' && index > 0))
        {
            i = indexOf(c);
            // append character to word
            if(cursor->children[i] == NULL)
            {
                cursor->children[i] = malloc(sizeof(node));               
                cursor = cursor->children[indexOf(c)];
                index++;
            }
            else if(cursor->children[i] != NULL)
            {
                cursor = cursor->children[i];
                index++;
            }

            // ignore alphabetical strings too long to be words
            if (index > LENGTH)
            {
                // consume remainder of alphabetical string
                while ((c = fgetc(fp)) != EOF && isalpha(c));

                // prepare for new word
                cursor = root;
                index = 0;
            }
        }

        // ignore words with numbers (like MS Word can)
        else if (isdigit(c))
        {
            // consume remainder of alphanumeric string
            while ((c = fgetc(fp)) != EOF && isalnum(c));

            // prepare for new word
            cursor = root;
            index = 0;
        }

        // we must have found a whole word
        else if (index > 0)
        {
            // terminate current word
            cursor->is_word = true;
            countDict++;

            // prepare for next word
            cursor = root;
            index = 0;
        }
    }
    
    // check whether there was an error
    if (ferror(fp))
    {
        fclose(fp);
        printf("Error loading %s.\n", dictionary);
        return false;
    }

    return true;
}

/**
 * Returns number of words in dictionary if loaded else 0 if not yet loaded.
 */
unsigned int size(void)
{
    return countDict;
}

/**
 * Unloads dictionary from memory.  Returns true if successful else false.
 */
bool unload(void)
{
    cursor = root;

    recursion(cursor);
    
    return true;
}

void recursion(node* current)
{
   for (int i = 0; i < 27; i++)
   {
       if (current->children[i] != NULL)
       {
           recursion(current->children[i]);
       }
   }
   free(current);
}
