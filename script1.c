/* SCRIPTl 141095 */
#include <stdio.h>
#include <stdlib.h>
#define MAX_ENTRIES 10000
typedef struct
char *name;
char *val;
} entry;
char *makeword(char *1ine, char stop);
char *fmakeword(FILE *f, char stop, int *len);
char x2c(char *what);
void unescape_url(char *url);
void plustospace(char *str);
maintint argc, char *argv[]) {
entry entries[MAX_ENTRIES];
register int x,m=0;
int cl;
char client[80];
strcpy (client, "J.DUPONT" ) ; /* simulation */
printf("Content-type : text/html%c%c",10,10);
if(strcmp(getenv("REQUEST_METHOD"),"POST"))
{
printf ("Erreur méthode \n");
exit(1);
}
if (strcmp (getenv( "CONTENT_TYPE") , "application/x-www-form-urlencoded" ))
{
printf("Erreur content_type \n");
exit(1) ;
}
cl = atoi(getenv("CONTENT_LENGTH"));
/* on utilise la librairie util.c (fournie avec le serveur de NCSA)
pour "analyser" les paramétrés reçus */
for(x=0,-cl && ( ! feof (stdin) ) ;x++)
{
m=x;
entries[x].val = fmakeword(stdin, &cl) ;
plustospace(entriestx].val);
unescape_url(entries[x].val);
entries[x].name = makeword(entries[x].val,' = ') ;
}
/* ici on trouvera normalement le code recherchant dans une base de donnees
si le numéro de compte contenu dans entries[0].val a bien pour mot de
passe la valeur contenue dans entries[1].val et quel est le nom du client
si OUI on declenchera la sequence suivante générant le formulaire :
*/
printf("<b>%c",10) ;
printf("<form method=\"post\" action=\"http://www.in2p3.fr/cgi-bin/script2\">%c",10);
printf("<h2>Banque de l'IN3P4</h2>%c", 10) ;
printf("<h3>Compte %s - %s</h3>%c",entries[0].val,client,10);
printf("<i>Quel type d'op&eacute;ration voulez-vous effectuer ? </i>%c",10);
printf("<ol>%c" ,10) ;
printf("<li><input type=\"radio\" name=\"op\" value=\"rele\"> Relev&eacute;%c",10);
printf("<li><input type=\"radio\" name=\"op\” value=\"vir\"> Virement%c",10);
printf ( "<li><input type=\"radio\ " name=\"op\" value=\"chq\ “> Commande de ch&eacute;quier%c“,10) ;
printf("</ol>%c",10);
/* on passe en champ cache le numéro du compte et le nom du client au script suivant */
printf("<input type=\"hidden\" name=\”cpte\" value=%s>%c”,entries[0].val,10);
printf("<input type=\"hidden\” name=\”client\” value=%s>%c", client,10);
printf("<input type=\"submit\" value=\"ValidezX">%c", 10) ;
printf("</form>%c",10) ;
printf("</b>%c”,10) ;