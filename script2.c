/* SCRIPT2 */
#include <stdio.h>
#include <stdlib.h>
#define MAX_ENTRIES 10000
typedef struct
{
char *name;
char *val;
} entry;
char *makeword(char *line, char stop);
char *fmakeword(FILE *f, char stop, int *len);
char x2c(char *what);
void unescape_url(char *url);
void plustospace(char *str);
maintint argc, char *argv[]) {
entry entries[MAX_ENTRIES];
register int x,m=0;
int cl;
printf("Content-type: text/html%c%c",10,10) ;
if(strcmp(getenv("REQUEST_METHOD"),"POST"))
{
printf ("Erreur methode \n");
exit(1);
}
if ( strcmp(getenv(“CONTENT_TYPE") , "application/x-www-form-urlencoded"))
{
printf("Erreur content-type \n");
exit( 1 ) ;
}
cl = atoi(getenv("CONTENT_LENGTH"));
for(x=0;cl && (!feof(stdin));x++)
{
m=x;
entries[x].val = fmakeword(stdin,&cl);
plustospace(entries[x].val);
unescape_url(entries[x].val);
entries[x].name = makeword(entries[x].val,' = ') ;
)
printf("<b>%c",10);
printf("<h2>Banque de 1'1N3P4</h2>%c”,10);
printf("<h3>Compte %s - %s </h3>%c",entries[1].val,entries[2].val,10);
if (strcmp (entries[0].val,"chq")==NULL)
{
printf("<i>Votre comande de ch&eacute;quier est enregistr&eacute;e.</i>%c",10);
}
/* else if (strcmp (entries[0].val,"rele" .... */
printf("</b>%c",10);
}